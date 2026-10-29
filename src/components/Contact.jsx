import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const createPoint = () => ({ x: 0, y: 0, vx: 0, vy: 0 });

export default function Contact() {
  const sectionRef = useRef(null);
  const dialogRef = useRef(null);
  const pullBtnRef = useRef(null);
  const triggerReleaseRef = useRef(() => {});
  const resetIdleRef = useRef(() => {});
  const dragTargetRef = useRef({ x: 0, y: 0 });
  const activeDragRef = useRef(null);
  const didDragRef = useRef(false);

  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    let tween;
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const points = [createPoint(), createPoint(), createPoint()];
    const state = { release: 0 };
    let isReleasing = false;

    const dispatchMotion = () => {
      window.dispatchEvent(new Event("portfolio:contact-motion"));
    };

    const syncDataset = () => {
      section.dataset.contactRelease = String(state.release);
      dispatchMotion();
    };

    triggerReleaseRef.current = () => {
      if (isReleasing) return;
      isReleasing = true;
      dragTargetRef.current.x = 0;
      dragTargetRef.current.y = 0;
      setPhase("releasing");
      section.dataset.contactPhase = "releasing";
      tween?.kill();
      tween = gsap.to(state, {
        release: 1,
        duration: 1.65 * !reducedMotion.matches,
        ease: "power2.inOut",
        onUpdate: syncDataset,
        onComplete: () => {
          syncDataset();
          setPhase("open");
          section.dataset.contactPhase = "open";
          const dialog = dialogRef.current;
          if (dialog) {
            if (typeof dialog.showModal === "function") {
              try {
                if (!dialog.open) dialog.showModal();
              } catch (_) {
                dialog.setAttribute("open", "true");
              }
            } else {
              dialog.setAttribute("open", "true");
            }
          }
        },
      });
    };

    resetIdleRef.current = () => {
      isReleasing = false;
      setPhase("idle");
      section.dataset.contactPhase = "idle";
      tween?.kill();
      tween = gsap.to(state, {
        release: 0,
        duration: 0.9 * !reducedMotion.matches,
        ease: "power2.inOut",
        onUpdate: syncDataset,
      });
    };

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(section);

    // Spring simulation ticker
    const tickerCb = (time, deltaTime) => {
      if (reducedMotion.matches || !isVisible || document.hidden) return;

      const dt = deltaTime / 1000;
      let remaining = Math.min(dt, 0.04);
      while (remaining > 0) {
        let step = Math.min(remaining, 1 / 120);
        let target =
          !activeDragRef.current && !isReleasing && section.hasAttribute("data-contact-thread-reached")
            ? { x: 20 * Math.sin(1.3 * time), y: 1.5 * Math.cos(2.6 * time) }
            : dragTargetRef.current;

        for (let idx = points.length - 1; idx >= 0; idx--) {
          let pt = points[idx];
          let prev = idx ? points[idx - 1] : target;
          let scale = idx ? 0.52 : 1;
          let stiffness = [340, 240, 180][idx];
          let damping = [29, 24, 22][idx];
          pt.vx += ((prev.x * scale - pt.x) * stiffness - pt.vx * damping) * step;
          pt.vy += ((prev.y * scale - pt.y) * stiffness - pt.vy * damping) * step;
          pt.x += pt.vx * step;
          pt.y += pt.vy * step;
        }
        remaining -= step;
      }

      let [endPt, nearPt, pullPt] = points;
      let updates = {
        contactPullX: pullPt.x,
        contactPullY: pullPt.y,
        contactNearX: nearPt.x,
        contactNearY: nearPt.y,
        contactEndX: endPt.x,
        contactEndY: endPt.y,
        contactTension: Math.min(1, Math.hypot(endPt.x, endPt.y) / 64),
        contactIdle: 0,
      };

      let changed = false;
      Object.entries(updates).forEach(([key, val]) => {
        let formatted = val.toFixed(2);
        if (section.dataset[key] !== formatted) {
          section.dataset[key] = formatted;
          changed = true;
        }
      });

      let xPx = endPt.x + "px";
      let yPx = endPt.y + "px";
      if (section.style.getPropertyValue("--contact-end-x") !== xPx) {
        section.style.setProperty("--contact-end-x", xPx);
      }
      if (section.style.getPropertyValue("--contact-end-y") !== yPx) {
        section.style.setProperty("--contact-end-y", yPx);
      }

      if (changed) dispatchMotion();
    };

    gsap.ticker.add(tickerCb);

    return () => {
      tween?.kill();
      gsap.ticker.remove(tickerCb);
      observer.disconnect();
      [
        "contactRelease",
        "contactPullX",
        "contactPullY",
        "contactNearX",
        "contactNearY",
        "contactEndX",
        "contactEndY",
        "contactTension",
        "contactIdle",
      ].forEach((key) => delete section.dataset[key]);
      ["--contact-end-x", "--contact-end-y"].forEach((prop) => section.style.removeProperty(prop));
    };
  }, []);

  const handlePointerUp = (e, cancel = false) => {
    let drag = activeDragRef.current;
    if (drag && e.pointerId === drag.pointer) {
      activeDragRef.current = null;
      didDragRef.current = drag.distance > 6;
      dragTargetRef.current.x = 0;
      dragTargetRef.current.y = 0;
      delete sectionRef.current?.dataset.contactDragging;
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}
      if (!cancel && drag.distance >= 42) {
        triggerReleaseRef.current();
      }
    }
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
    resetIdleRef.current();
  };

  return (
    <section
      ref={sectionRef}
      className="contact-finale"
      id="contact"
      data-thread-scene="contact"
      data-contact-phase={phase}
      aria-labelledby="contact-title"
    >
      <div className="contact-stage">
        <div className="contact-copy">
          <h2
            id="contact-title"
            className="contact-statement"
            aria-label="Have an idea worth building?"
          >
            <span aria-hidden="true">
              <span data-velocity-type="true">HAVE AN</span>
            </span>
            <span aria-hidden="true">
              <span data-velocity-type="true" data-direction="reverse">
                IDEA
              </span>
            </span>
            <span aria-hidden="true">
              <span data-velocity-type="true">WORTH</span>
            </span>
            <span aria-hidden="true">
              <span data-velocity-type="true" data-direction="reverse">
                BUILDING?
              </span>
            </span>
          </h2>
          <button
            ref={pullBtnRef}
            className="contact-pull interaction-link"
            type="button"
            aria-haspopup="dialog"
            data-cursor="TALK"
            onClick={() => triggerReleaseRef.current()}
          >
            LET'S BUILD.{" "}
            <span className="contact-arrow interaction-arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                focusable="false"
              >
                <path d="M4 20 20 4M7 4h13v13" />
              </svg>
            </span>
          </button>
          <noscript>
            <a
              className="contact-pull interaction-link"
              href="mailto:zenaanisuresh@gmail.com"
            >
              LET'S BUILD.{" "}
              <span className="contact-arrow interaction-arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  focusable="false"
                >
                  <path d="M4 20 20 4M7 4h13v13" />
                </svg>
              </span>
            </a>
          </noscript>
        </div>
        <div className="contact-thread">
          <div className="contact-knot" aria-hidden="true"></div>
          <span className="contact-end">
            <span className="contact-end-anchor"></span>
            <button
              className="contact-thread-grip"
              type="button"
              aria-label="Pull the thread to open contact form"
              aria-haspopup="dialog"
              onPointerDown={(ev) => {
                if (ev.button === 0) {
                  activeDragRef.current = {
                    pointer: ev.pointerId,
                    startX: ev.clientX,
                    startY: ev.clientY,
                    distance: 0,
                  };
                  try {
                    ev.currentTarget.setPointerCapture(ev.pointerId);
                  } catch (_) {}
                  if (sectionRef.current) sectionRef.current.dataset.contactDragging = "";
                }
              }}
              onPointerMove={(ev) => {
                let drag = activeDragRef.current;
                if (drag && ev.pointerId === drag.pointer) {
                  let dx = ev.clientX - drag.startX;
                  let dy = ev.clientY - drag.startY;
                  dragTargetRef.current.x = dx;
                  dragTargetRef.current.y = dy;
                  drag.distance = Math.hypot(dx, dy);
                }
              }}
              onPointerUp={(ev) => handlePointerUp(ev)}
              onPointerCancel={(ev) => handlePointerUp(ev, true)}
              onClick={() => {
                if (!didDragRef.current) triggerReleaseRef.current();
                didDragRef.current = false;
              }}
            ></button>
            <span className="contact-pull-hint">LET'S CONNECT</span>
          </span>
        </div>
      </div>
      <div className="contact-bottom">
        <a
          className="contact-top interaction-link"
          href="#main-content"
          data-cursor="UP"
        >
          BACK TO TOP{" "}
          <span aria-hidden="true">
            <svg
              className="navigation-arrow"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 21V3m-8 8 8-8 8 8" />
            </svg>
          </span>
        </a>
      </div>
      <p className="sr-only" role="status"></p>
      <dialog
        ref={dialogRef}
        className="contact-dialog"
        data-submitted="false"
        aria-labelledby="contact-form-title"
        data-lenis-prevent="true"
      >
        <button
          className="contact-form-close interaction-link"
          type="button"
          data-cursor="CLOSE"
          aria-label="Close contact form"
          onClick={closeDialog}
        >
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
            <path
              d="m1 1 14 14M15 1 1 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="contact-dialog-content" data-submitted="false">
          <div className="contact-dialog-body">
            <div className="contact-dialog-intro">
              <h3 id="contact-form-title">
                LET'S <br />
                <span>BUILD SOMETHING.</span>
              </h3>
              <p>
                A project, an opportunity, <br />
                a conversation.
              </p>
            </div>
            <form
              className="contact-form"
              aria-busy="false"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been sent.");
                closeDialog();
              }}
            >
              <label className="sr-only" aria-hidden="true">
                Leave a message
                <input autoComplete="off" tabIndex="-1" name="website" />
              </label>
              <div className="contact-form-row">
                <label>
                  YOUR NAME
                  <input
                    autoComplete="name"
                    required
                    maxLength="80"
                    placeholder="Enter your name"
                    name="name"
                  />
                </label>
                <label>
                  YOUR EMAIL
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    maxLength="254"
                    placeholder="Your email address"
                    name="email"
                  />
                </label>
              </div>
              <label>
                TELL ME ABOUT YOUR PROJECT
                <textarea
                  name="message"
                  required
                  maxLength="4000"
                  rows="3"
                  placeholder="A project, an opportunity, or something you’re building."
                ></textarea>
              </label>
              <button
                className="contact-form-submit interaction-link"
                type="submit"
                data-cursor="SEND"
              >
                SEND MESSAGE{" "}
                <span className="interaction-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    focusable="false"
                  >
                    <path d="M4 20 20 4M7 4h13v13" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}
