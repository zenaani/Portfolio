import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { FaAndroid } from "react-icons/fa";
import { SiKotlin } from "react-icons/si";
import { SiJetpackcompose } from "react-icons/si";
import { SiArduino } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const techstackRef = useRef(null);

  useEffect(() => {
    gsap.to(techstackRef.current, {
      translateY: 100,
      scrollTrigger: {
        trigger: techstackRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 0.6,
      },
    });
  });

  return (
    <>
      <section className="flex flex-col h-screen bg-black">
        <div className="group px-24 py-10">
          <div
            id="outline"
            className="relative top-10 text-white font-mont text-7xl font-extrabold self-end group-hover:top-1 transition-all duration-500 z-0"
          >
            Tech-Stackkkkk
          </div>
          <div className="relative text-white font-mont text-7xl font-extrabold self-end z-10">
            Tech-Stackkk
          </div>
          <div
            id="outline"
            className="relative bottom-10 text-white font-mont text-7xl font-extrabold self-end group-hover:bottom-1 transition-all duration-500"
          >
            Tech-Stackkkkk
          </div>
        </div>

        {/* Elements flying using motion Path */}
        <div ref={techstackRef} className="flex text-7xl gap-10 px-24">
          <FaHtml5 className="text-orange-500" />
          <FaCss3Alt className="text-blue-500" />
          <IoLogoJavascript className="text-yellow-300" />
          <FaReact className=" text-sky-500" />
          <FaAndroid className="text-green-0" />
          <SiFirebase className="text-yellow-400" />
          <SiJetpackcompose className="text-green-0" />
          <SiKotlin className=" text-purple-600" />
          <SiArduino className="text-green-0" />
        </div>
      </section>
    </>
  );
};

export default TechStack;
