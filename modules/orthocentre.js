/* =========================================================
 * Hiruwiki module: orthocentre
 * Visualisation of the orthocentre of a triangle
 * =========================================================
 * i18n: add a new key to the `messages` object below and
 *       a matching entry for every language code you need.
 *       Fall back to 'en' when the wiki language is absent.
 * ========================================================= */

(function () {
  /* ── I18N ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
  var messages = /* I18N_START */ {
    "en": {
        "_name": "Orthocentre",
        "hint": "Drag any vertex to see how the orthocentre changes"
    },
    "es": {
        "_name": "Ortocentro",
        "hint": "Arrastra un vértice para ver cómo se mueve el ortocentro"
    },
    "eu": {
        "_name": "Ortozentro",
        "hint": "Edozein erpin mugitu ortozentroa nola mugitzen den ikusteko"
    },
    "fr": {
        "_name": "Orthocentre",
        "hint": "Tirez n'importe quel sommet pour voir comment l' orthocentre change"
    },
    "ga": {
        "_name": "Ortalár",
        "hint": "Tarraing aon rinn chun a fheiceáil conas a athraíonn an t-ortalár (Scála: 1 cm = 40 px)"
    },
    "ko": {
        "_name": "수심",
        "hint": "꼭짓점을 드래그해서 수심이 어떻게 바뀌는지를 확인하세요"
    },
    "mk": {
        "_name": "Ортоцентар",
        "hint": "Повлечете некое теме за да видите како се менува ортоцентарот"
    },
    "nl": {
        "_name": "Hoogtepunt van een driehoek",
        "hint": "Sleep een hoekpunt om te zien hoe het hoogtepunt verandert"
    },
    "qqq": {
        "_name": "Name of the Orthocentre module",
        "hint": "Instruction text shown in the footer."
    },
    "sk": {
        "_name": "Ortocentrum",
        "hint": "Potiahnutím ľubovoľného vrcholu uvidíte, ako sa ortocentrum mení"
    },
    "tr": {
        "_name": "Yükseklik merkezi",
        "hint": "Herhangi bir köşeyi sürükleyerek yükseklik merkezinin nasıl değiştiğini görün (Ölçek: 1 cm = 40 px)"
    }
} /* I18N_END */
var lang = (window.mw && mw.config.get('wgUserLanguage')) || 'en';
var banana = new Banana(lang.split('-')[0]);
banana.load(messages);

function t(key, vars) {
    var args = Array.isArray(vars) ? vars : [];
    var str = banana.i18n(key, ...args);
    if (vars && typeof vars === 'object' && !Array.isArray(vars)) {
        Object.keys(vars).forEach(function(k) {
            str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
        });
    }
    return str;
}

/* ── Constants ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
  var SCALE = 40; /* pixels per centimetre  */
  var RULER_H = 0; /* ruler removed */
  var DPR = window.devicePixelRatio || 1;

  /* ── Geometry helpers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
  function dist(a, b) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function footPerp(P, V1, V2) {
    var dx = V2.x - V1.x,
      dy = V2.y - V1.y;
    var t = ((P.x - V1.x) * dx + (P.y - V1.y) * dy) / (dx * dx + dy * dy);
    return { x: V1.x + t * dx, y: V1.y + t * dy };
  }

  /* Returns the projection parameter t (foot = V1 + t*(V2-V1));
   * t < 0 means foot beyond V1, t > 1 means foot beyond V2. */
  function footT(P, V1, V2) {
    var dx = V2.x - V1.x,
      dy = V2.y - V1.y;
    return ((P.x - V1.x) * dx + (P.y - V1.y) * dy) / (dx * dx + dy * dy);
  }

  /*
   * Orthocentre: intersect altitude from A (perpendicular to BC through A)
   * with altitude from B (perpendicular to AC through B).
   *
   * n1 = direction perpendicular to BC = ( -(C.y-B.y), C.x-B.x )
   * n2 = direction perpendicular to AC = ( -(C.y-A.y), C.x-A.x )
   *
   * Solve  A + t·n1 = B + s·n2  for t:
   *   det = n1.x·n2.y − n1.y·n2.x
   *   t   = ( (B.x−A.x)·n2.y − (B.y−A.y)·n2.x ) / det
   */
  function orthocentre(A, B, C) {
    var n1x = -(C.y - B.y),
      n1y = C.x - B.x;
    var n2x = -(C.y - A.y),
      n2y = C.x - A.x;
    var det = n1x * n2y - n1y * n2x;
    if (Math.abs(det) < 1e-9) {
      return { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
    }
    var t = ((B.x - A.x) * n2y - (B.y - A.y) * n2x) / det;
    return { x: A.x + t * n1x, y: A.y + t * n1y };
  }

  function angleDeg(V, A, B) {
    var ax = A.x - V.x,
      ay = A.y - V.y;
    var bx = B.x - V.x,
      by = B.y - V.y;
    var cos = (ax * bx + ay * by) / (Math.hypot(ax, ay) * Math.hypot(bx, by));
    return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  }

  function labelOffset(V, others, mag) {
    var dx = 0,
      dy = 0;
    others.forEach(function (O) {
      dx += V.x - O.x;
      dy += V.y - O.y;
    });
    var l = Math.hypot(dx, dy) || 1;
    return { x: V.x + (dx / l) * mag, y: V.y + (dy / l) * mag };
  }

  function toCm(px) {
    return px / SCALE;
  }
  function fmt(n) {
    return n.toFixed(2);
  }

  /* ── Build widget ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ── */
  function buildWidget(container) {
    var lang = (window.mw && mw.config.get("wgUserLanguage")) || "en";
    lang = lang.split("-")[0];
    if (!messages[lang]) {
      lang = "en";
    }
    var msg = messages[lang];

    /* -- HTML skeleton -- */
    container.innerHTML =
      '<div class="hw-orthocentre">' +
      '<canvas class="hw-canvas"></canvas>' +
      "</div>";

    /* -- Footer -- */
    var footer = document.createElement("div");
    footer.className = "hw-footer";
    var fLogo = document.createElement("a");
    fLogo.className = "hw-footer-icon";
    fLogo.href = (window.mw && mw.util.getUrl("Wikipedia:Hiruwiki")) || "#";
    fLogo.title = "Hiruwiki";
    if (window.hiruwiki && window.hiruwiki.getLogoSvg) {
      fLogo.insertAdjacentHTML("beforeend", hiruwiki.getLogoSvg(22));
    }
    var fText = document.createElement("span");
    fText.className = "hw-footer__text";
    fText.textContent = msg.hint;
    footer.appendChild(fLogo);
    footer.appendChild(fText);
    container.appendChild(footer);

    var canvas = container.querySelector(".hw-canvas");
    var ctx = canvas.getContext("2d");
    var W,
      H,
      verts,
      dragging = -1;

    function $(id) {
      return container.querySelector("#" + id);
    }

    /* -- vertex initialisation -- */
    function initVerts() {
      var ox = W / 2 - 5.5 * SCALE;
      var oy = 20;
      verts = [
        { x: ox + 5.5 * SCALE, y: oy + 1.2 * SCALE },
        { x: ox + 1.2 * SCALE, y: oy + 8.0 * SCALE },
        { x: ox + 9.8 * SCALE, y: oy + 8.0 * SCALE },
      ];
    }

    /* -- colour palette -- */
    function isDark() {
      /* MediaWiki night-mode classes take priority; fall back to prefers-color-scheme */
      var root = document.documentElement;
      if (
        root.classList.contains("skin-theme-clientpref-night") ||
        root.classList.contains("client-dark-mode") ||
        document.body.classList.contains("mw-dark-mode")
      ) {
        return true;
      }
      return !!(
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }

    function palette() {
      var dark = isDark();
      return {
        dark: dark,
        tri: hiruwiki.getThemeColor(
          "hw-color-primary",
          dark ? "#AFA9EC" : "#534AB7",
        ),
        orth: hiruwiki.getThemeColor(
          "hw-color-success",
          dark ? "#5DCAA5" : "#0F6E56",
        ),
        foot: hiruwiki.getThemeColor(
          "hw-color-warning",
          dark ? "#FAC775" : "#BA7517",
        ),
        text: hiruwiki.getThemeColor(
          "hw-text-base",
          dark ? "#E8E6DC" : "#1a1a18",
        ),
        ruleBg: hiruwiki.getThemeColor(
          "hw-bg-subtle",
          dark ? "#2C2C2A" : "#F1EFE8",
        ),
        ruleTick: hiruwiki.getThemeColor("hw-text-placeholder", "#888780"),
        ruleText: hiruwiki.getThemeColor("hw-text-muted", "#5F5E5A"),
        grid: hiruwiki.getThemeColor("hw-border", dark ? "#444441" : "#D3D1C7"),
        dotBg: hiruwiki.getThemeColor(
          "hw-bg-base",
          dark ? "#1e1e1c" : "#ffffff",
        ),
      };
    }

    /* -- right-angle mark at altitude foot -- */
    function drawRightAngle(T, fromV, V1, V2, color) {
      var sdx = V2.x - V1.x,
        sdy = V2.y - V1.y;
      var sl = Math.hypot(sdx, sdy);
      if (sl < 1e-6) {
        return;
      }
      var su = { x: sdx / sl, y: sdy / sl };
      var rdx = fromV.x - T.x,
        rdy = fromV.y - T.y;
      var rl = Math.hypot(rdx, rdy);
      if (rl < 1e-6) {
        return;
      }
      var ru = { x: rdx / rl, y: rdy / rl };
      var SZ = 12;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(T.x + su.x * SZ, T.y + su.y * SZ);
      ctx.lineTo(T.x + su.x * SZ + ru.x * SZ, T.y + su.y * SZ + ru.y * SZ);
      ctx.lineTo(T.x + ru.x * SZ, T.y + ru.y * SZ);
      ctx.stroke();
    }

    /* -- grid (major cm lines only, very faint) -- */
    function drawGrid(p) {
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = p.grid;
      ctx.globalAlpha = 0.18;
      /* vertical lines */
      for (var cm = 0; cm * SCALE < W + SCALE; cm++) {
        ctx.beginPath();
        ctx.moveTo(cm * SCALE, 0);
        ctx.lineTo(cm * SCALE, H);
        ctx.stroke();
      }
      /* horizontal lines */
      for (var row = 0; row * SCALE < H + SCALE; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * SCALE);
        ctx.lineTo(W, row * SCALE);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
    }

    /* -- main draw -- */
    function draw() {
      if (!verts) {
        return;
      }
      ctx.clearRect(0, 0, W, H);
      var p = palette();
      drawGrid(p);
      /* ruler removed */

      var A = verts[0],
        B = verts[1],
        C = verts[2];
      var a = dist(B, C),
        b = dist(C, A),
        c = dist(A, B);

      var Hpt = orthocentre(A, B, C);
      var Ha = footPerp(A, B, C);
      var Hb = footPerp(B, C, A);
      var Hc = footPerp(C, A, B);

      var angA = angleDeg(A, B, C);
      var angB = angleDeg(B, A, C);
      var angC = angleDeg(C, A, B);
      var isObtuse = angA > 90.05 || angB > 90.05 || angC > 90.05;

      var cx3 = (A.x + B.x + C.x) / 3,
        cy3 = (A.y + B.y + C.y) / 3;

      var footColor = p.foot;
      var footDash = p.dark
        ? "rgba(250,199,117,0.55)"
        : "rgba(186,117,23,0.50)";

      /* 1. solid altitude segments: vertex → foot */
      ctx.save();
      ctx.strokeStyle = footColor;
      ctx.lineWidth = 1.4;
      [
        [A, Ha],
        [B, Hb],
        [C, Hc],
      ].forEach(function (pr) {
        ctx.beginPath();
        ctx.moveTo(pr[0].x, pr[0].y);
        ctx.lineTo(pr[1].x, pr[1].y);
        ctx.stroke();
      });
      ctx.restore();

      /* 2. dashed extensions for obtuse triangle */
      if (isObtuse) {
        ctx.save();
        ctx.strokeStyle = footDash;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([5, 5]);

        /* 2a. Extend triangle SIDES with dashes where a foot falls outside the segment.
         *     footT gives projection parameter t; outside [0,1] means foot is off the edge.
         *     Side a = BC (foot Ha from A), side b = CA (foot Hb from B), side c = AB (foot Hc from C). */
        [
          { foot: Ha, V1: B, V2: C } /* altitude from A, foot on line BC */,
          { foot: Hb, V1: C, V2: A } /* altitude from B, foot on line CA */,
          { foot: Hc, V1: A, V2: B } /* altitude from C, foot on line AB */,
        ].forEach(function (s) {
          var t = footT(s.foot, s.V1, s.V2);
          if (t < -0.001) {
            /* foot is beyond V1 — draw dashed from V1 to foot */
            ctx.beginPath();
            ctx.moveTo(s.V1.x, s.V1.y);
            ctx.lineTo(s.foot.x, s.foot.y);
            ctx.stroke();
          } else if (t > 1.001) {
            /* foot is beyond V2 — draw dashed from V2 to foot */
            ctx.beginPath();
            ctx.moveTo(s.V2.x, s.V2.y);
            ctx.lineTo(s.foot.x, s.foot.y);
            ctx.stroke();
          }
        });

        /* 2b. Extend altitude lines with dashes from foot through to H.
         *     The solid segment already covers vertex→foot; the dashed part is foot→H. */
        [
          [A, Ha],
          [B, Hb],
          [C, Hc],
        ].forEach(function (pr) {
          var V = pr[0],
            F = pr[1];
          var dx = F.x - V.x,
            dy = F.y - V.y;
          var len = Math.hypot(dx, dy);
          if (len < 1e-6) {
            return;
          }
          var ux = dx / len,
            uy = dy / len;
          /* scalar projection of (H - F) onto the altitude direction */
          var toH = (Hpt.x - F.x) * ux + (Hpt.y - F.y) * uy;
          if (Math.abs(toH) < 1) {
            return;
          } /* foot is essentially at H */
          /* extend from foot toward H (+ 8 px overshoot) */
          var ext = toH + 8 * Math.sign(toH);
          ctx.beginPath();
          ctx.moveTo(F.x, F.y);
          ctx.lineTo(F.x + ux * ext, F.y + uy * ext);
          ctx.stroke();
        });

        ctx.setLineDash([]);
        ctx.restore();
      }

      /* 3. triangle fill + stroke */
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.lineTo(C.x, C.y);
      ctx.closePath();
      ctx.fillStyle = p.dark ? "rgba(175,169,236,.07)" : "rgba(83,74,183,.06)";
      ctx.fill();
      ctx.strokeStyle = p.tri;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      /* 4. right-angle marks at altitude feet */
      ctx.save();
      drawRightAngle(Ha, A, B, C, footColor);
      drawRightAngle(Hb, B, C, A, footColor);
      drawRightAngle(Hc, C, A, B, footColor);
      ctx.restore();

      /* 5. altitude foot dots */
      [Ha, Hb, Hc].forEach(function (F) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(F.x, F.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = footColor;
        ctx.fill();
        ctx.restore();
      });

      /* 6. orthocentre dot */
      ctx.save();
      ctx.beginPath();
      ctx.arc(Hpt.x, Hpt.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = p.orth;
      ctx.fill();
      ctx.strokeStyle = p.dotBg;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      /* 7. vertex dots */
      verts.forEach(function (V, i) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(V.x, V.y, dragging === i ? 8 : 6.5, 0, Math.PI * 2);
        ctx.fillStyle = p.tri;
        ctx.fill();
        ctx.strokeStyle = p.dotBg;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      });

      /* 8. text labels */
      ctx.save();
      ctx.textBaseline = "middle";

      /* vertex names */
      ctx.font =
        "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
      [A, B, C].forEach(function (V, i) {
        var lbl = labelOffset(
          V,
          verts.filter(function (_, j) {
            return j !== i;
          }),
          26,
        );
        ctx.fillStyle = p.tri;
        ctx.textAlign = "center";
        ctx.fillText(["A", "B", "C"][i], lbl.x, lbl.y);
      });

      /* H label — offset +16, −16 from dot */
      ctx.fillStyle = p.orth;
      ctx.font =
        "italic 700 18px 'Latin Modern Math', 'STIX Two Math', 'Computer Modern', 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.fillText("H", Hpt.x + 16, Hpt.y - 16);

      /* side length labels removed */

      ctx.restore();
    }

    /* -- resize -- */
    function resize() {
      W = canvas.offsetWidth;
      H = 440;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      initVerts();
      draw();
    }

    /* -- pointer helpers -- */
    function ptFromEvent(e) {
      var rect = canvas.getBoundingClientRect();
      var src = e.touches ? e.touches[0] : e;
      return {
        x: (src.clientX - rect.left) * (W / rect.width),
        y: (src.clientY - rect.top) * (H / rect.height),
      };
    }
    function hitTest(pt) {
      return verts.findIndex(function (v) {
        return Math.hypot(v.x - pt.x, v.y - pt.y) < 16;
      });
    }
    function clamp(pt) {
      return {
        x: Math.max(10, Math.min(W - 10, pt.x)),
        y: Math.max(4, Math.min(H - 10, pt.y)),
      };
    }

    canvas.addEventListener("mousedown", function (e) {
      dragging = hitTest(ptFromEvent(e));
      if (dragging >= 0) {
        canvas.style.cursor = "grabbing";
      }
    });
    canvas.addEventListener("mousemove", function (e) {
      if (dragging < 0) {
        canvas.style.cursor =
          hitTest(ptFromEvent(e)) >= 0 ? "grab" : "crosshair";
        return;
      }
      verts[dragging] = clamp(ptFromEvent(e));
      draw();
    });
    canvas.addEventListener("mouseup", function () {
      dragging = -1;
      canvas.style.cursor = "crosshair";
    });
    canvas.addEventListener("mouseleave", function () {
      dragging = -1;
    });
    canvas.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        dragging = hitTest(ptFromEvent(e));
      },
      { passive: false },
    );
    canvas.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        if (dragging < 0) {
          return;
        }
        verts[dragging] = clamp(ptFromEvent(e));
        draw();
      },
      { passive: false },
    );
    canvas.addEventListener("touchend", function () {
      dragging = -1;
    });

    /* dark-mode live update (MediaWiki) */
    var observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    /* kick off */
    var ro = new ResizeObserver(resize);
    ro.observe(canvas);
  }

  /* ----------------------------------------------------------
   * Initialise all matching containers on the page
   * ---------------------------------------------------------- */
  document
    .querySelectorAll('.hiruwiki[data-module="orthocentre"]')
    .forEach(buildWidget);
})();
