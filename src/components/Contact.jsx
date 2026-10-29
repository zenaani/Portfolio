import React from "react";

export default function Contact() {
  return (
    <section
      className="contact-finale"
      id="contact"
      data-thread-scene="contact"
      data-contact-phase="idle"
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
            className="contact-pull interaction-link"
            type="button"
            aria-haspopup="dialog"
            data-cursor="TALK"
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
              aria-label="Open contact form"
              aria-haspopup="dialog"
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
            <form className="contact-form" aria-busy="false">
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
