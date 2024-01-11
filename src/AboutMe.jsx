import React, { useRef } from "react";
import loki from "./assets/loki.jpg";
import "./AboutMe.css";

const AboutMe = () => {
  return (
    <>
      <section className="flex flex-col h-screen bg-black">
        <div className="group px-24 py-10">
          <div
            id="outline"
            className="relative top-10 text-white font-mont text-7xl font-extrabold self-end group-hover:top-1 transition-all duration-500 z-0"
          >
            About Me
          </div>
          <div className="relative text-white font-mont text-7xl font-extrabold self-end z-10">
            About Me
          </div>
          <div
            id="outline"
            className="relative bottom-10 text-white font-mont text-7xl font-extrabold self-end group-hover:bottom-1 transition-all duration-500"
          >
            About Me
          </div>
        </div>

        <div className="flex">
          <img
            src={loki}
            className="h-[400px] w-[400px] object-cover mx-24 rounded-xl shadow-2xl"
          ></img>
          <div className="group text-white text-2xl font-mont font-bold mr-10">
            I am a recent graduate with a
            <span className="group-hover:text-4xl group-hover:text-green-0 transition-all duration-1000">
              {" "}
              B.Tech Degree{" "}
            </span>
            , driven by an insatiable
            <span className="group-hover:text-4xl group-hover:text-green-0 transition-all duration-1000">
              {" "}
              curiosity for technology{" "}
            </span>
            and its ever-evolving facets. My journey into began with an
            intrinsic fascination for
            <span className="group-hover:text-4xl group-hover:text-green-0 transition-all duration-1000">
              {" "}
              problem-solving
            </span>
            , leading me to dive into the world of Full Stack Development.
            Through my education and personal projects, I've cultivated a
            <span className="group-hover:text-4xl group-hover:text-green-0 transition-all duration-1000">
              {" "}
              strong foundation{" "}
            </span>
            in various programming languages, frameworks, and development tools
            essential for Full Stack roles.
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
