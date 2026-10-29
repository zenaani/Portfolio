import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations(lenis) {
  // Sync Lenis with GSAP ScrollTrigger
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);
  }

  // 1. Hero Entrance & Line Unblur
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => {
      hero.setAttribute("data-hero-entrance", "complete");
      const heroLines = hero.querySelectorAll(".hero-line-reveal");
      gsap.fromTo(
        heroLines,
        { opacity: 0, y: 35, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
        }
      );

      // Hero thread draw-in
      const heroPaths = hero.querySelectorAll(".hero-thread-path");
      heroPaths.forEach((path) => {
        path.style.visibility = "visible";
        gsap.fromTo(
          path,
          { strokeDashoffset: 2500, strokeDasharray: 2500 },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }
        );
      });
    }, 600);
  }

  // 2. Kinetic Velocity Typography Parallax ([data-velocity-type])
  const velocityEls = gsap.utils.toArray("[data-velocity-type]");
  velocityEls.forEach((el) => {
    const heroParent = el.closest(".hero");
    const practice = el.closest(".practice-intro, .capability-heading");
    const about = el.closest(".about-heading, .contact-statement");
    const isReverse = el.dataset.direction === "reverse";

    const shiftAmount = heroParent
      ? 0.055 * window.innerWidth
      : el.clientWidth * (practice?.matches(".capability-heading") ? 0.04 : 0.08);

    gsap.fromTo(
      el,
      { x: 0 },
      {
        x: isReverse ? shiftAmount : -shiftAmount,
        ease: "none",
        scrollTrigger: {
          trigger: heroParent ?? practice ?? el,
          start: heroParent ? "top top" : about ? "top 65%" : "top 75%",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      }
    );
  });

  // 3. Heading Reveals with Blur Filter ([data-heading-reveal])
  const headingReveals = gsap.utils.toArray("[data-heading-reveal]");
  headingReveals.forEach((heading) => {
    const lines = heading.querySelectorAll(".heading-line-reveal, .practice-line, span");
    if (lines.length > 0) {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 28, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true,
          },
        }
      );
    }
  });

  // 4. Standard Reveals ([data-reveal])
  const reveals = gsap.utils.toArray("[data-reveal]");
  reveals.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });

  // 5. Project World Kickers, Descriptions & Explore Links
  const worldMeta = gsap.utils.toArray(".world-kicker, .world-description, .world-link");
  worldMeta.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      }
    );
  });

  // 6. Project 01: Eigna Floorplan & Repair Badge Animation
  const eigna = document.getElementById("eigna");
  if (eigna) {
    const flat = eigna.querySelector(".eigna-flat");
    const repair = eigna.querySelector(".eigna-repair-details, .eigna-repair-desktop");
    const badge = eigna.querySelector(".eigna-completed");
    
    if (flat) {
      gsap.fromTo(
        flat,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: eigna,
            start: "top 65%",
            once: true,
          },
        }
      );
    }

    if (repair) {
      gsap.fromTo(
        repair,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: eigna,
            start: "top 55%",
            once: true,
          },
        }
      );
    }

    if (badge) {
      gsap.fromTo(
        badge,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.4,
          scrollTrigger: {
            trigger: eigna,
            start: "top 50%",
            once: true,
          },
        }
      );
    }
  }

  // 7. Project 02: Orbit Agentic AI Orchestration
  const orbit = document.getElementById("orbit");
  if (orbit) {
    const ready = orbit.querySelector(".orbit-ready");
    const bubbles = orbit.querySelectorAll(".orbit-bubble, .world-object");
    
    if (ready) {
      gsap.fromTo(
        ready,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: orbit,
            start: "top 50%",
            once: true,
          },
        }
      );
    }

    if (bubbles.length > 0) {
      gsap.fromTo(
        bubbles,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: orbit,
            start: "top 60%",
            once: true,
          },
        }
      );
    }
  }

  // 8. Project 03: MealOPS Dynamic Wallet Counter
  const mesa = document.getElementById("mesa");
  if (mesa) {
    const amountSpan = mesa.querySelector(".mesa-wallet-amount span");
    const debitSpan = mesa.querySelector(".mesa-wallet-debit");
    const paidBadge = mesa.querySelector(".mesa-paid-check");

    ScrollTrigger.create({
      trigger: mesa,
      start: "top 50%",
      once: true,
      onEnter: () => {
        if (amountSpan) {
          const counter = { val: 50000 };
          gsap.to(counter, {
            val: 49760,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              amountSpan.textContent = `₹${Math.round(counter.val).toLocaleString("en-IN")}`;
            },
          });
        }
        if (debitSpan) {
          gsap.fromTo(
            debitSpan,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }
        if (paidBadge) {
          gsap.fromTo(
            paidBadge,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: "back.out(2)" }
          );
        }
      },
    });
  }

  // 9. Project 04: Papertrail Scan Beam & Invoice Extraction
  const papertrail = document.getElementById("papertrail");
  if (papertrail) {
    const acmePaper = papertrail.querySelector(".scan-paper-acme");
    const beam = papertrail.querySelector(".scan-invoice-beam");
    const extracted = papertrail.querySelector(".scan-extracted");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: papertrail,
        start: "top 50%",
        once: true,
      },
    });

    if (acmePaper) {
      tl.fromTo(
        acmePaper,
        { y: 35, rotation: -18 },
        { y: 0, rotation: -14, duration: 0.9, ease: "power2.out" }
      );
    }

    if (beam) {
      tl.fromTo(
        beam,
        { y: -30, opacity: 0, visibility: "visible" },
        { y: 80, opacity: 1, duration: 1.4, ease: "power1.inOut" },
        "-=0.4"
      );
    }

    if (extracted) {
      tl.fromTo(
        extracted,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      );
    }
  }

  // 10. Project 05: Scribe Audio Playhead & Document Typing
  const scribe = document.getElementById("scribe");
  if (scribe) {
    const playhead = scribe.querySelector(".scribe-playhead");
    const lines = scribe.querySelectorAll(".scribe-generated-line");
    const completeTag = scribe.querySelector(".scribe-analysis-complete");
    const pendingTag = scribe.querySelector(".scribe-analysis-pending");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scribe,
        start: "top 45%",
        once: true,
      },
    });

    if (playhead) {
      tl.fromTo(playhead, { x: 0 }, { x: 190, duration: 2.2, ease: "power1.inOut" }, 0);
    }

    if (lines.length > 0) {
      tl.fromTo(
        lines,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.35, duration: 0.6, ease: "power2.out" },
        0.3
      );
    }

    if (completeTag && pendingTag) {
      tl.set(pendingTag, { display: "none" }, 1.8);
      tl.fromTo(completeTag, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.8);
    }
  }

  // 11. Project 06: Crediflow Financial Documents & Sanction
  const creditflow = document.getElementById("creditflow");
  if (creditflow) {
    const docs = [
      { selector: ".credit-pan", x: -50, y: 40, rot: -8 },
      { selector: ".credit-gst", x: 25, y: 60, rot: 5 },
      { selector: ".credit-bank", x: -70, y: 90, rot: 6 },
      { selector: ".credit-itr", x: 60, y: 80, rot: 7 },
    ];

    docs.forEach(({ selector, x, y, rot }) => {
      const el = creditflow.querySelector(selector);
      if (el) {
        gsap.fromTo(
          el,
          { x, y, rotation: rot + 8, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: rot,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: creditflow,
              start: "top 55%",
              once: true,
            },
          }
        );
      }
    });

    const scanLine = creditflow.querySelector(".credit-scan");
    if (scanLine) {
      gsap.fromTo(
        scanLine,
        { opacity: 0, visibility: "visible" },
        {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: creditflow,
            start: "top 45%",
            once: true,
          },
        }
      );
    }

    const approval = creditflow.querySelector(".credit-approval, .credit-outcome");
    if (approval) {
      gsap.fromTo(
        approval,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: creditflow,
            start: "top 45%",
            once: true,
          },
        }
      );
    }
  }

  // 12. About Fingerprint & Signature
  const about = document.getElementById("about");
  if (about) {
    const fingerprint = about.querySelector(".about-fingerprint");
    if (fingerprint) {
      gsap.fromTo(
        fingerprint,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: about,
            start: "top 60%",
            once: true,
          },
        }
      );
    }
  }

  // Refresh ScrollTrigger to ensure accurate trigger points
  ScrollTrigger.refresh();

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
