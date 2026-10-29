import React, { useState } from "react";

export default function SiteHeader({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`site-header ${menuOpen ? "is-open" : ""}`}>
      <a 
        className="wordmark" 
        aria-label="ZS — Zenaani Suresh home" 
        data-cursor="HOME" 
        href="#main-content"
        onClick={(e) => handleLinkClick(e, "main-content")}
      >
        ZS
      </a>
      <button 
        className="menu-button interaction-link" 
        type="button" 
        aria-expanded={menuOpen} 
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
      <nav 
        id="primary-navigation" 
        aria-label="Primary navigation" 
        data-lenis-prevent="true"
      >
        <a 
          className="interaction-underline" 
          data-cursor="GO" 
          href="#capabilities"
          onClick={(e) => handleLinkClick(e, "capabilities")}
        >
          EXPERTISE
        </a>
        <a 
          className="interaction-underline" 
          data-cursor="GO" 
          href="#projects"
          onClick={(e) => handleLinkClick(e, "projects")}
        >
          PROJECTS
        </a>
        <a 
          className="interaction-underline" 
          data-cursor="GO" 
          href="#about"
          onClick={(e) => handleLinkClick(e, "about")}
        >
          ABOUT
        </a>
        <a 
          className="interaction-underline" 
          data-cursor="GO" 
          href="#contact"
          onClick={(e) => handleLinkClick(e, "contact")}
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
