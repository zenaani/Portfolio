import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import loki from "./assets/loki.jpg";
import playstation from "./assets/playstation.png";
import starbucks from "./assets/starbucks.png";
import busbuzz1 from "./assets/busbuzz1.png";
import busbuzz2 from "./assets/busbuzz2.png";
import busbuzz3 from "./assets/busbuzz3.png";
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
import { FaPython } from "react-icons/fa";
import { SiOpencv } from "react-icons/si";
import { FaRaspberryPi } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export const Works = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const handleClick = (i) => {
    if (i == 1) {
      window.open("https://starbucks-silk-iota.vercel.app/");
    } else if (i == 2) {
      window.open("https://playstation-one.vercel.app/");
    }
  };

  const handleGit = () => {
    window.open("https://github.com/zenaani");
  };

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 1,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <>
      <section className="overflow-hidden bg-black text-white">
        <div ref={triggerRef}>
          <div className="group px-24 py-10">
            <div
              id="outline"
              className="relative top-10 text-white font-mont text-7xl font-extrabold self-end group-hover:top-1 transition-all duration-500 z-0"
            >
              Works
            </div>
            <div className="relative text-white font-mont text-7xl font-extrabold self-end z-10">
              Works
            </div>
            <div
              id="outline"
              className="relative bottom-10 text-white font-mont text-7xl font-extrabold self-end group-hover:bottom-1 transition-all duration-500"
            >
              Works
            </div>
          </div>

          <div
            ref={sectionRef}
            className="flex flex-row relative h-screen w-[400vw]"
          >
            {/*Works Page 1 */}
            <div className="h-screen w-screen flex flex-col">
              <div className="flex">
                <img
                  src={starbucks}
                  className="h-1/2 object-contain mx-24 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-1000"
                  onClick={() => handleClick(1)}
                ></img>
                <div className="flex flex-col gap-10 text-5xl font-mont font-semibold">
                  Starbucks Landing Page
                  <div className="flex gap-3 text-3xl items-center">
                    <div>View Code</div>
                    <FaGithub />
                  </div>
                  <div className="flex gap-3 text-3xl items-center">
                    <FaHtml5 className="text-orange-500" />
                    <FaCss3Alt className="text-blue-500" />
                    <IoLogoJavascript className="text-yellow-300" />
                    <FaReact className=" text-sky-500" />
                  </div>
                </div>
                <div className="w-[3px] h-1/2 bg-grey-0 rounded-full"></div>
              </div>
            </div>

            {/*Works Page 2 */}
            <div className="h-screen w-screen flex flex-col">
              <div className="flex">
                <img
                  src={playstation}
                  className="h-1/2 object-contain mx-24 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-1000"
                  onClick={() => handleClick(2)}
                ></img>
                <div className="flex flex-col gap-10 text-5xl font-mont font-semibold">
                  Playstation Landing Page
                  <div className="flex gap-3 text-3xl items-center">
                    <div>View Code</div>
                    <FaGithub />
                  </div>
                  <div className="flex gap-3 text-3xl items-center">
                    <FaHtml5 className="text-orange-500" />
                    <FaCss3Alt className="text-blue-500" />
                    <IoLogoJavascript className="text-yellow-300" />
                    <FaReact className=" text-sky-500" />
                  </div>
                </div>
                <div className="w-[3px] h-1/2 bg-grey-0 rounded-full"></div>
              </div>
            </div>

            {/*Works Page 3 */}
            <div className="h-screen w-screen flex flex-col">
              <div className="flex gap-12">
                <img
                  src={busbuzz1}
                  className="h-[350px] object-cover ml-24 rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <img
                  src={busbuzz2}
                  className="h-[350px] object-cover rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <img
                  src={busbuzz3}
                  className="h-[350px] object-cover mr-24 rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <div className="flex flex-col gap-10 text-5xl font-mont font-semibold">
                  BusBuzz Android App
                  <div className="flex gap-3 text-3xl items-center">
                    <div>View Code</div>
                    <FaGithub />
                  </div>
                  <div className="flex gap-3 text-3xl items-center">
                    <FaAndroid className="text-green-0" />
                    <SiFirebase className="text-yellow-400" />
                    <SiJetpackcompose className="text-green-0" />
                    <SiKotlin className=" text-purple-600" />
                    <SiArduino className="text-green-0" />
                  </div>
                </div>
              </div>
            </div>

            {/*Works Page 4 */}
            <div className="h-screen w-screen flex flex-col">
              <div className="flex gap-12">
                <img
                  src={busbuzz1}
                  className="h-[350px] object-cover ml-24 rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <img
                  src={busbuzz2}
                  className="h-[350px] object-cover rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <img
                  src={busbuzz3}
                  className="h-[350px] object-cover mr-24 rounded-xl shadow-2xl hover:scale-125 transition-all duration-1000"
                ></img>
                <div className="flex flex-col gap-10 text-5xl font-mont font-semibold">
                  Blend - Social Media Platform
                  <div className="flex gap-3 text-3xl items-center">
                    <div>View Code</div>
                    <FaGithub />
                  </div>
                  <div className="flex gap-3 text-3xl items-center">
                    <FaRaspberryPi className="text-red-400" />
                    <FaPython className="text-blue-400" />
                    <SiOpencv className="text-red-400" />
                    <FaAndroid className="text-green-0" />
                    <SiKotlin className=" text-purple-600" />
                    <SiJetpackcompose className="text-green-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
