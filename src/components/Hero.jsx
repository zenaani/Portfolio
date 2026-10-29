import React from "react";
import HeroThread from "./HeroThread";

export default function Hero() {
  return (
    <section
      className="hero thread-scene"
      data-thread-scene="hero"
      data-hero-entrance="waiting"
      aria-labelledby="hero-title"
    >
      <HeroThread />
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          <span className="hero-line-reveal">
            <span className="hero-line" data-velocity-type="true">
              I BUILD
            </span>
          </span>
          <span className="hero-line-reveal">
            <span
              className="hero-line"
              data-velocity-type="true"
              data-direction="reverse"
            >
              APPS THAT
            </span>
          </span>
          <span className="hero-line-reveal">
            <span className="hero-line hero-line-last" data-velocity-type="true">
              FEEL RIGHT.
            </span>
          </span>
        </h1>
        <div className="hero-footer">
          <div className="hero-support">
            <p>
              Android Developer building thoughtful mobile experiences and
              reliable backend systems with Kotlin and Spring Boot.
            </p>
          </div>
          <a className="scroll-cue" href="#work" data-cursor="FOLLOW">
            SCROLL TO EXPLORE{" "}
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
                <path d="M12 3v18m-8-8 8 8 8-8" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
