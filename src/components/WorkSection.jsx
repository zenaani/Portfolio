import React from "react";

export default function WorkSection() {
  return (
    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="practice-intro thread-scene" data-thread-scene="work-index">
        <div className="practice-copy">
          <h2 id="work-title" data-heading-reveal="true">
            <span className="heading-line-reveal">
              <span className="practice-line" data-velocity-type="true">From a tap</span>
            </span>
            <span className="heading-line-reveal">
              <span className="practice-line" data-velocity-type="true" data-direction="reverse">to a table</span>
            </span>
            <span className="heading-line-reveal">
              <span className="practice-line" data-velocity-type="true">row.</span>
            </span>
          </h2>
          <p className="practice-description" data-reveal="true">
            I care about what the user sees and what the server does next, and I keep the two honest with each other.
          </p>
        </div>
        <div
          className="practice-drawing"
          role="img"
          aria-label="One continuous thread connects design, code and delivery."
        >
          <span className="practice-label practice-intent">DESIGN</span>
          <span className="practice-label practice-interaction">CODE</span>
          <span className="practice-label practice-system">DELIVERY</span>
        </div>
      </div>

      <section
        className="capabilities thread-scene"
        id="capabilities"
        data-thread-scene="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="capability-heading">
          <h2 id="capabilities-title" data-heading-reveal="true">
            <span className="heading-line-reveal">
              <span className="capability-line" data-velocity-type="true">I BUILD THE INTERFACE.</span>
            </span>
            <span className="heading-line-reveal">
              <span className="capability-line" data-velocity-type="true" data-direction="reverse">AND THE SYSTEMS</span>
            </span>
            <span className="heading-line-reveal">
              <span className="capability-line" data-velocity-type="true">BEHIND IT.</span>
            </span>
          </h2>
        </div>

        <div className="capability-orbit">
          <svg className="capability-junction capability-split" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="4" />
          </svg>

          <div className="capability-discipline capability-product">
            <h3>ANDROID DEVELOPMENT</h3>
            <ul>
              <li data-capability-angle="0.7074832117793429" style={{ left: "17.503846381456164%", top: "12%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Application Architecture</strong>
                  <small>Structure applications around clear requirements and maintainable code.</small>
                </span>
              </li>
              <li data-capability-angle="1.181000030320636" style={{ left: "3.7506756806112875%", top: "31%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>UI Engineering</strong>
                  <small>Turn product requirements and designs into intuitive Android experiences.</small>
                </span>
              </li>
              <li data-capability-angle="1.5707963267948966" style={{ left: "0%", top: "50%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Jetpack Compose UI</strong>
                  <small>Build responsive, reusable interfaces with declarative UI.</small>
                </span>
              </li>
              <li data-capability-angle="1.9605926232691573" style={{ left: "3.7506756806112946%", top: "69%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Android Architecture</strong>
                  <small>Keep application code modular, testable and maintainable.</small>
                </span>
              </li>
              <li data-capability-angle="2.4341094418104503" style={{ left: "17.503846381456164%", top: "88%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Rapid Prototyping</strong>
                  <small>Validate ideas through working features and iterative development.</small>
                </span>
              </li>
            </ul>
          </div>

          <div className="capability-discipline capability-ai">
            <h3>BACKEND & SYSTEMS</h3>
            <ul>
              <li data-capability-angle="0.7074832117793429" style={{ left: "82.49615361854384%", top: "12%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>REST API Development</strong>
                  <small>Connect mobile applications to reliable backend services.</small>
                </span>
              </li>
              <li data-capability-angle="1.181000030320636" style={{ left: "96.2493243193887%", top: "31%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Spring Boot</strong>
                  <small>Build structured backend applications using Java and Spring Boot.</small>
                </span>
              </li>
              <li data-capability-angle="1.5707963267948966" style={{ left: "100%", top: "50%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>API Integration</strong>
                  <small>Integrate Android applications with external services and APIs.</small>
                </span>
              </li>
              <li data-capability-angle="1.9605926232691573" style={{ left: "96.2493243193887%", top: "69%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Data & Persistence</strong>
                  <small>Design data flows and persistence for dependable applications.</small>
                </span>
              </li>
              <li data-capability-angle="2.4341094418104503" style={{ left: "82.49615361854384%", top: "88%" }}>
                <svg className="capability-dot" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" />
                  <circle className="capability-core" cx="9" cy="9" r="2.5" />
                </svg>
                <span>
                  <strong>Firebase & Cloud Integration</strong>
                  <small>Keep application data synchronised and accessible across supported devices.</small>
                </span>
              </li>
            </ul>
          </div>

          <svg className="capability-junction capability-merge" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <circle cx="5" cy="5" r="4" />
          </svg>
        </div>
      </section>
    </section>
  );
}
