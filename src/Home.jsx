import React, { useState } from "react";
import "./Home.css";

const Home = ({ scrollToContact }) => {
  //const [cursorX, setCursorX] = useState();
  const [speed1, setSpeed1] = useState();
  const [speed2, setSpeed2] = useState();
  const [speed3, setSpeed3] = useState();

  let width = window.innerWidth;

  window.addEventListener("mousemove", (e) => {
    //setCursorX(e.pageX);

    let normalizedPosition = e.pageX / (width / 2) - 1;

    setSpeed1(50 * normalizedPosition);
    setSpeed2(70 * normalizedPosition);
    setSpeed3(60 * normalizedPosition);
  });

  return (
    <>
      <section className="flex flex-col h-screen bg-black items-center justify-center">
        <div className="group absolute top-4 right-4">
          <div
            id="outline"
            className="relative top-4 text-white font-mont text-4xl font-extrabold self-end group-hover:top-1 transition-all duration-500 z-0"
          >
            Contact
          </div>
          <div
            onClick={scrollToContact}
            className="relative text-white font-mont text-4xl font-extrabold self-end z-10 cursor-pointer"
          >
            Contact
          </div>
          <div
            id="outline"
            className="relative bottom-4 text-white font-mont text-4xl font-extrabold self-end group-hover:bottom-1 transition-all duration-500"
          >
            Contact
          </div>
        </div>

        <div className="font-mont font-bold bg-white absolute top-0 left-0 px-10">
          Site under Construction and Not optimized for smartphone.
        </div>

        <div className="flex w-3/4 absolute">
          <div className="w-1/2 py-56 overflow-hidden">
            <div
              className="relative left-1/2 text-green-0 text-4xl font-mont font-extrabold transition-all duration-1000"
              style={{ transform: `skew(0deg,-10deg) translate(${speed1}%` }}
            >
              Hi, I'm
            </div>
            <div
              className="relative left-1/2 text-green-0 text-7xl font-mont font-extrabold transition-all duration-1000"
              style={{ transform: `skew(0deg,-10deg) translate(${speed2}%` }}
            >
              Zenaani_Suresh
            </div>
            <div
              className="relative left-1/2 text-green-0 text-4xl font-mont font-extrabold transition-all duration-1000"
              style={{
                transform: `skew(0deg,-10deg) translate(${speed3 + 15}%`,
              }}
            >
              Fullstack_Developer
            </div>
          </div>

          <div className="w-1/2 py-56 overflow-hidden">
            <div
              className="relative right-1/2 text-grey-0 text-4xl font-mont font-extrabold transition-all duration-1000"
              style={{ transform: `skew(0deg,10deg) translate(${speed1}%` }}
            >
              Hi, I'm
            </div>
            <div
              className="relative right-1/2 text-grey-0 text-7xl font-mont font-extrabold transition-all duration-1000"
              style={{ transform: `skew(0deg,10deg) translate(${speed2}%` }}
            >
              Zenaani_Suresh
            </div>
            <div
              className="relative right-1/2 text-grey-0 text-4xl font-mont font-extrabold transition-all duration-1000"
              style={{
                transform: `skew(0deg,10deg) translate(${speed3 + 15}%`,
              }}
            >
              Fullstack_Developer
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
