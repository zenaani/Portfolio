import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import "./portfolio.css";
import { initScrollAnimations } from "./motion";

import SiteLoader from "./components/SiteLoader";
import CustomCursor from "./components/CustomCursor";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  const [loaderDismissed, setLoaderDismissed] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderDismissed(true);
    }, 2200);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    // Initialize all scroll animations
    const cleanupMotion = initScrollAnimations(lenis);

    // Wire up dialog open/close buttons & smooth navigation
    const handlePullClick = (e) => {
      const pullBtn = e.target.closest(".contact-pull, .contact-knot, .contact-thread-grip");
      const dialog = document.querySelector("dialog.contact-dialog");
      if (pullBtn && dialog) {
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "true");
        }
      }

      const closeBtn = e.target.closest(".contact-form-close");
      if (closeBtn && dialog) {
        if (typeof dialog.close === "function") {
          dialog.close();
        } else {
          dialog.removeAttribute("open");
        }
      }

      const topBtn = e.target.closest(".contact-top");
      if (topBtn) {
        e.preventDefault();
        lenis.scrollTo(0);
      }
    };

    document.addEventListener("click", handlePullClick);

    return () => {
      clearTimeout(timer);
      if (cleanupMotion) cleanupMotion();
      document.removeEventListener("click", handlePullClick);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -20 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteLoader
        loaded={loaderDismissed}
        onDismiss={() => setLoaderDismissed(true)}
      />
      <CustomCursor />
      <SiteHeader onNavigate={handleNavigate} />
      <main id="main-content">
        <Hero />
        <WorkSection />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}

export default App;
