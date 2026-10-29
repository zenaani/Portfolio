import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const o = ["back", "front", "back", "front", "back", "front", "back", "front", "back", "back"];

export default function HeroThread() {
  const backRef = useRef(null);
  const frontRef = useRef(null);

  useEffect(() => {
    let t,
      backSvg = backRef.current,
      frontSvg = frontRef.current,
      hero = backSvg?.closest(".hero");
    if (!backSvg || !frontSvg || !hero) return;

    let heroLines = Array.from(hero.querySelectorAll(".hero-line")),
      segments = o.map((depth, idx) =>
        (depth === "front" ? frontSvg : backSvg).querySelector(`[data-segment="${idx}"]`)
      ),
      heads = [backSvg, frontSvg].map((svg) => svg.querySelector(".hero-thread-head")),
      origin = backSvg.querySelector(".hero-thread-origin"),
      endRing = backSvg.querySelector(".hero-thread-end-ring"),
      endDot = backSvg.querySelector(".hero-thread-end-dot"),
      threadEntry = backSvg.querySelector("[data-thread-entry]"),
      tail = backSvg.querySelector("[data-hero-thread-tail]"),
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
      sampleData = [],
      totalLength = 0,
      isReady = document.documentElement.classList.contains("is-ready"),
      progress = +!!isReady,
      startTime = 0,
      lastTime = 0,
      animFrame = 0,
      resizeRaf = 0,
      isActive = true;

    const setCirclePos = (el, cx, cy) => {
      if (el) {
        el.setAttribute("cx", String(cx));
        el.setAttribute("cy", String(cy));
      }
    };

    const updateRender = () => {
      if (progress === 1) {
        segments.forEach((seg) => {
          if (seg) {
            if (seg.style.strokeDasharray !== "none") seg.style.strokeDasharray = "none";
            seg.style.strokeDashoffset = "0";
            seg.style.visibility = "visible";
          }
        });
        heads.forEach((h) => {
          if (h) h.style.opacity = "0";
        });
        if (endRing) endRing.style.opacity = "1";
        if (endDot) endDot.style.opacity = "1";
        return;
      }
      if (!totalLength) return;
      let drawnLen = progress * totalLength,
        curSeg = sampleData[0],
        segOffset = 0;
      sampleData.forEach((seg) => {
        let segProg = Math.max(0, Math.min(1, drawnLen / seg.length));
        seg.path.style.strokeDashoffset = String(seg.length * (1 - segProg));
        seg.path.style.visibility = segProg > 0 ? "visible" : "hidden";
        if (drawnLen >= 0) {
          curSeg = seg;
          segOffset = segProg * seg.length;
        }
        drawnLen -= seg.length;
      });
      if (curSeg?.sampler) {
        let pt = curSeg.sampler.getPointAtLength(segOffset);
        heads.forEach((h, idx) => {
          if (h) {
            setCirclePos(h, pt.x, pt.y);
            h.style.opacity = progress < 1 && curSeg.layer === (idx ? "front" : "back") ? "1" : "0";
          }
        });
      }
      if (endRing) endRing.style.opacity = progress === 1 ? "1" : "0";
      if (endDot) endDot.style.opacity = progress === 1 ? "1" : "0";
    };

    const computeGeometry = (force = true) => {
      if (!isActive || !backRef.current || !frontRef.current) return;
      let layoutChanged = force || !t || t.entrance !== hero.dataset.heroEntrance;
      if (layoutChanged) {
        let heroBounds = hero.getBoundingClientRect(),
          fontSize = Number.parseFloat(getComputedStyle(heroLines[0]).fontSize) || 48,
          lineBounds = heroLines.map((l) => l.getBoundingClientRect()),
          glyphs = new Map();

        // Glyph range extraction with safety bounds
        for (let [lineIdx, charIdx] of [
          [0, 3],
          [0, 4],
          [1, 0],
          [1, 1],
          [2, 8],
          [2, 9],
        ]) {
          try {
            let lineEl = heroLines[lineIdx];
            let textNode = lineEl?.firstChild;
            let textLen = textNode?.textContent?.length || 0;
            let safeChar = Math.min(charIdx, Math.max(0, textLen - 1));
            let range = document.createRange();
            range.setStart(textNode, safeChar);
            range.setEnd(textNode, Math.min(textLen, safeChar + 1));
            let glyphRect = range.getBoundingClientRect();
            glyphs.set(`${lineIdx}:${charIdx}`, {
              x: glyphRect.left - heroBounds.left + 0.073 * fontSize - Number(gsap.getProperty(lineEl, "x")),
              y: lineBounds[lineIdx].top - heroBounds.top + 0.034 * fontSize,
              w: glyphRect.width || fontSize * 0.5,
              h: 0.69 * fontSize,
            });
          } catch (err) {
            glyphs.set(`${lineIdx}:${charIdx}`, {
              x: heroBounds.width * 0.3,
              y: heroBounds.height * 0.3,
              w: fontSize * 0.5,
              h: 0.69 * fontSize,
            });
          }
        }

        t = {
          bounds: heroBounds,
          size: fontSize,
          glyphs: glyphs,
          practice: document.querySelector(".practice-drawing")?.getBoundingClientRect(),
          supportTop:
            (hero.querySelector(".hero-footer")?.getBoundingClientRect().top ?? heroBounds.bottom) -
            heroBounds.top,
          supportTextTop:
            (hero.querySelector(".hero-support")?.getBoundingClientRect().top ?? heroBounds.bottom) -
            heroBounds.top,
          paddingBottom: Number.parseFloat(getComputedStyle(hero).paddingBottom) || 0,
          entrance: hero.dataset.heroEntrance,
        };
      }

      let {
        bounds: heroBounds,
        size: fontSize,
        practice: practiceBounds,
        supportTop,
        supportTextTop,
        paddingBottom,
      } = t;

      let lineX = heroLines.map((l) => Number(gsap.getProperty(l, "x")) || 0);
      const getGlyph = (lineIdx, charIdx) => {
        let g = t.glyphs.get(`${lineIdx}:${charIdx}`) || { x: 0, y: 0, w: fontSize * 0.5, h: 0.69 * fontSize };
        return { ...g, x: g.x + lineX[lineIdx] };
      };

      let k = getGlyph(0, 3),
        L = getGlyph(0, 4),
        P = getGlyph(1, 0),
        R = getGlyph(1, 1),
        q = getGlyph(2, 8),
        I = getGlyph(2, 9),
        O = q.h;

      let D = { x: Math.max(32, 0.063 * heroBounds.width), y: 86 };
      let isMobile = heroBounds.width <= 820;
      let F = {
        x: isMobile
          ? heroBounds.width - 12
          : practiceBounds
          ? practiceBounds.left - heroBounds.left + 0.47 * practiceBounds.width
          : 0.56 * heroBounds.width,
        y: heroBounds.height - 0.5 * paddingBottom,
      };

      let B = { x: L.x + 0.54 * L.w, y: L.y + 0.31 * L.h };
      let W = { x: k.x - 0.18 * fontSize, y: k.y + 0.05 * O };
      let z = { x: P.x + 0.44 * P.w, y: P.y + 0.32 * P.h };
      let H = { x: P.x + 1.8 * P.w, y: P.y - 0.04 * P.h };
      let Y = Math.max(8, P.x - 0.08 * P.w);
      let G = { x: q.x + 0.18 * q.w, y: q.y - 0.015 * O };
      let V = { x: Y + G.y - (P.y + 0.57 * P.h), y: G.y };

      const lerp = (p1, p2, f) => ({ x: p1.x + (p2.x - p1.x) * f, y: p1.y + (p2.y - p1.y) * f });
      const splitBezier = ([p0, p1, p2, p3], f) => {
        let m0 = lerp(p0, p1, f),
          m1 = lerp(p1, p2, f),
          m2 = lerp(p2, p3, f),
          q0 = lerp(m0, m1, f),
          q1 = lerp(m1, m2, f),
          b = lerp(q0, q1, f);
        return [
          [p0, m0, q0, b],
          [b, q1, m2, p3],
        ];
      };

      let Q = (4 * Y - 2 * z.x + V.x) / 3;
      let [Z, J] = splitBezier(
        [
          z,
          { x: Q, y: z.y + ((Q - z.x) * (z.y - H.y)) / (z.x - H.x || 1) },
          { x: z.x + Q - V.x, y: V.y },
          V,
        ],
        0.5
      );
      let [_, ee] = splitBezier(
        [
          { x: L.x + 0.64 * L.w, y: L.y + 0.49 * L.h },
          { x: L.x + 0.288 * L.w, y: L.y + 0.776 * L.h },
          H,
          z,
        ],
        0.2
      );

      let et = 0,
        er = 1;
      for (let s = 0; s < 20; s++) {
        let mid = (et + er) / 2;
        splitBezier(ee, mid)[0][3].x > R.x - 0.01 * fontSize ? (et = mid) : (er = mid);
      }
      let [ea, en] = splitBezier(ee, (et + er) / 2);
      const toCubic = ([, p1, p2, p3]) => `C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;

      let ei = { x: I.x + 0.66 * I.w, y: I.y + 0.44 * O };
      let es = { x: q.x + 0.64 * q.w, y: q.y + 0.46 * O };
      let ec = { x: I.x + 0.14 * I.w, y: I.y + 1.02 * O };
      let el = isMobile ? Math.max(ec.y + 0.51 * O, (q.y + O + supportTextTop) / 2) : ec.y + 0.51 * O;
      let ed = isMobile ? (el - ec.y) / 0.51 : O;
      let eh = { x: ec.x - 0.23 * ed, y: el };
      let eu = (f) => (isMobile ? ec.y + ((eh.y - ec.y) * f) / 0.51 : ec.y + O * f);
      let ep = Math.max(eh.y + 24, supportTop - 16);
      let ex = `${eh.x - 0.11 * ed} ${eh.y + 0.08 * ed}`;
      let em = isMobile
        ? `C ${ex}, ${F.x} ${ep - (ep - eh.y) / 3}, ${F.x} ${ep} L ${F.x} ${F.y}`
        : `C ${ex}, ${F.x} ${F.y - (F.y - eh.y) * 0.4}, ${F.x} ${F.y}`;

      let ey = [
        `M ${D.x} ${D.y} C ${D.x + 0.16 * fontSize} ${k.y - 0.3 * O}, ${W.x} ${W.y}, ${B.x} ${B.y}`,
        `M ${B.x} ${B.y} C ${B.x + (B.x - W.x) * 0.045} ${B.y + (B.y - W.y) * 0.045}, ${L.x + 0.8 * L.w} ${
          L.y + 0.36 * L.h
        }, ${L.x + 0.64 * L.w} ${L.y + 0.49 * L.h} ${toCubic(_)}`,
        `M ${ea[0].x} ${ea[0].y} ${toCubic(ea)}`,
        `M ${en[0].x} ${en[0].y} ${toCubic(en)}`,
        `M ${z.x} ${z.y} ${toCubic(Z)}`,
        `M ${J[0].x} ${J[0].y} ${toCubic(J)} H ${G.x}`,
        `M ${G.x} ${G.y} C ${I.x + 0.45 * I.w} ${G.y}, ${ei.x + 0.08 * I.w} ${q.y - 0.1 * O}, ${ei.x} ${ei.y}`,
        `M ${ei.x} ${ei.y} C ${ei.x - 0.08 * I.w} ${q.y + 0.98 * O}, ${es.x - 0.13 * q.w} ${q.y + 0.97 * O}, ${
          es.x
        } ${es.y}`,
        `M ${es.x} ${es.y} C ${es.x} ${q.y + 0.35 * O}, ${I.x + 0.14 * I.w} ${q.y + 0.32 * O}, ${
          I.x + 0.14 * I.w
        } ${q.y + 0.48 * O} L ${ec.x} ${ec.y}`,
        `M ${ec.x} ${ec.y} C ${ec.x - 0.04 * ed} ${eu(0.08)}, ${ec.x + 0.08 * ed} ${eu(0.1)}, ${
          ec.x - 0.04 * ed
        } ${eu(0.16)} S ${ec.x + 0.01 * ed} ${eu(0.27)}, ${ec.x - 0.13 * ed} ${eu(0.32)} S ${
          ec.x - 0.12 * ed
        } ${eu(0.43)}, ${eh.x} ${eh.y}`,
      ];

      if (layoutChanged) {
        [backSvg, frontSvg].forEach((svg) => {
          svg.setAttribute("viewBox", `0 0 ${heroBounds.width} ${heroBounds.height}`);
        });
      }

      totalLength = (
        sampleData = segments.map((seg, idx) => {
          seg.setAttribute("d", ey[idx]);
          let sampler =
            sampleData[idx]?.sampler ?? document.createElementNS("http://www.w3.org/2000/svg", "path");
          if (progress < 1 || !sampleData[idx]) sampler.setAttribute("d", ey[idx]);
          let len = progress === 1 && sampleData[idx] ? sampleData[idx].length : sampler.getTotalLength();
          if (progress < 1) {
            seg.style.strokeDasharray = `${len} ${len}`;
          }
          return {
            path: seg,
            sampler: sampler,
            length: len,
            layer: o[idx],
          };
        })
      ).reduce((sum, item) => sum + item.length, 0);

      if (tail) tail.setAttribute("d", `M ${eh.x} ${eh.y} ${em}`);
      if (layoutChanged) {
        setCirclePos(origin, D.x, D.y);
        setCirclePos(threadEntry, F.x, F.y);
      }
      setCirclePos(endRing, eh.x, eh.y);
      setCirclePos(endDot, eh.x, eh.y);

      updateRender();

      backSvg.style.opacity = "1";
      frontSvg.style.opacity = "1";

      window.dispatchEvent(
        new CustomEvent("portfolio:hero-thread-geometry", {
          detail: { layoutChanged },
        })
      );
    };

    const animateProgress = (timestamp) => {
      animFrame = 0;
      let delta = lastTime ? Math.min(40, timestamp - lastTime) : 16;
      lastTime = timestamp;
      progress = reducedMotion.matches ? 1 : Math.min(1, progress + delta / 3000);
      updateRender();
      if (progress < 1) {
        animFrame = requestAnimationFrame(animateProgress);
      } else {
        document.documentElement.dataset.heroThreadComplete = "true";
        window.dispatchEvent(new Event("portfolio:hero-thread-complete"));
      }
    };

    const triggerDraw = () => {
      if (!startTime && totalLength) {
        startTime = performance.now() + 100;
        if (isReady) {
          document.documentElement.dataset.heroThreadComplete = "true";
          window.dispatchEvent(new Event("portfolio:hero-thread-complete"));
          return;
        }
        animFrame = requestAnimationFrame(animateProgress);
      }
    };

    let needsLayout = false;
    const tickerUpdate = () => {
      gsap.ticker.remove(tickerUpdate);
      if (progress === 1 && t && window.scrollY >= t.bounds.height) return;
      computeGeometry(false);
    };

    const handleHeroMotion = (e) => {
      if (e?.type === "portfolio:hero-motion") {
        gsap.ticker.add(tickerUpdate);
      } else {
        if (e?.type !== "portfolio:hero-motion") needsLayout = true;
        if (!resizeRaf) {
          resizeRaf = requestAnimationFrame(() => {
            resizeRaf = 0;
            computeGeometry(needsLayout);
            needsLayout = false;
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => handleHeroMotion());

    document.fonts.ready.then(() => {
      if (isActive) {
        computeGeometry();
        resizeObserver.observe(hero);
        heroLines.forEach((l) => resizeObserver.observe(l));
        if (hero.dataset.heroEntrance === "complete") triggerDraw();
      }
    });

    window.addEventListener("portfolio:hero-motion", handleHeroMotion);
    window.addEventListener("portfolio:hero-text-complete", triggerDraw);
    window.addEventListener("orientationchange", handleHeroMotion);

    return () => {
      isActive = false;
      cancelAnimationFrame(animFrame);
      cancelAnimationFrame(resizeRaf);
      gsap.ticker.remove(tickerUpdate);
      resizeObserver.disconnect();
      window.removeEventListener("portfolio:hero-motion", handleHeroMotion);
      window.removeEventListener("portfolio:hero-text-complete", triggerDraw);
      window.removeEventListener("orientationchange", handleHeroMotion);
      delete document.documentElement.dataset.heroThreadComplete;
    };
  }, []);

  return (
    <>
      {["back", "front"].map((layer) => (
        <svg
          key={layer}
          ref={layer === "back" ? backRef : frontRef}
          className={`hero-thread-layer hero-thread-${layer}`}
          data-hero-thread={layer === "back" ? "" : undefined}
          aria-hidden="true"
        >
          {o.map(
            (depth, idx) =>
              depth === layer && (
                <path
                  key={idx}
                  data-segment={idx}
                  data-thread-depth={depth}
                  className="hero-thread-path"
                  style={{ strokeDasharray: "10000", strokeDashoffset: "10000" }}
                />
              )
          )}
          {layer === "back" && (
            <>
              <path
                data-hero-thread-tail=""
                data-thread-route="hero-tail"
                className="hero-thread-path"
                style={{ strokeDasharray: "10000", strokeDashoffset: "10000", visibility: "hidden" }}
              />
              <circle className="hero-thread-origin" r="4" />
              <circle className="hero-thread-end-ring" r="11" />
              <circle className="hero-thread-end-dot" r="4" />
              <circle r="4" data-thread-entry="portfolio" visibility="hidden" />
            </>
          )}
          <circle className="hero-thread-head" r="4" />
        </svg>
      ))}
    </>
  );
}
