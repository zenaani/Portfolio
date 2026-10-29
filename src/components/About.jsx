import React from "react";

export default function About() {
  return (
    <section
      className="about-story"
      id="about"
      data-thread-scene="about"
      aria-labelledby="about-title"
    >
      <div className="about-stage">
        <div className="about-profile">
          <div className="about-intro">
            <h2
              className="about-heading"
              id="about-title"
              data-heading-reveal="true"
            >
              <span className="heading-line-reveal">
                <span data-velocity-type="true">EVERY APP</span>
              </span>
              <span className="heading-line-reveal">
                <span data-velocity-type="true" data-direction="reverse">
                  REFLECTS THE
                </span>
              </span>
              <span className="heading-line-reveal">
                <span data-velocity-type="true">THINKING BEHIND IT.</span>
              </span>
            </h2>
            <p className="about-personal" data-reveal="true">
              My approach combines thoughtful Android UI, maintainable Kotlin code
              and reliable backend engineering to build applications that are
              practical, intuitive and built to evolve.
            </p>
          </div>
          <div className="about-signature" data-reveal="true">
            <p className="about-name">ZENAANI SURESH.</p>
            <p className="about-role">Android Developer. Software Engineer.</p>
          </div>
        </div>
        <div
          className="about-fingerprint"
          role="img"
          aria-label="One continuous thread winds inward and outward to form a fingerprint, then continues into the next section."
        ></div>
      </div>
    </section>
  );
}
