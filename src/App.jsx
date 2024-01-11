import { useEffect, useRef, useState } from "react";
import "./App.css";
import Home from "./Home";
import AboutMe from "./AboutMe";
import { Works } from "./Works";
import Contact from "./Contact";
import TechStack from "./TechStack";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

function App() {
  const contactRef = useRef(null);
  const contactCompRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contactCompRef.current,
      {
        translateY: -50,
        scrollTrigger: {
          trigger: aboutRef.current,
          scrub: 0.6,
        },
      },
      {
        translateY: 0,
        scrollTrigger: {
          trigger: aboutRef.current,
          scrub: 0.6,
        },
      }
    );
  });

  const scrollToContact = () => {
    gsap.to(window, { duration: 1, scrollTo: contactRef.current });
  };

  return (
    <>
      <div
        ref={contactCompRef}
        className="fixed top-[0px] right-0 text-xl font-mont bg-white text-black font-semibold p-2 mr-10"
      >
        Contact
      </div>
      <Home scrollToContact={scrollToContact}></Home>
      <div ref={aboutRef}>
        <AboutMe></AboutMe>
      </div>
      <Works></Works>
      <TechStack></TechStack>
      <Contact ref={contactRef}></Contact>
    </>
  );
}

export default App;
