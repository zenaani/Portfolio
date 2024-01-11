import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Contact = React.forwardRef((props, ref) => {
  return (
    <>
      <section ref={ref} className="flex flex-col h-screen bg-black">
        <div className="group px-24 py-10">
          <div
            id="outline"
            className="relative top-10 text-white font-mont text-7xl font-extrabold self-end group-hover:top-1 transition-all duration-500 z-0"
          >
            Contact
          </div>
          <div className="relative text-white font-mont text-7xl font-extrabold self-end z-10">
            Contact
          </div>
          <div
            id="outline"
            className="relative bottom-10 text-white font-mont text-7xl font-extrabold self-end group-hover:bottom-1 transition-all duration-500"
          >
            Contact
          </div>
        </div>
        <div className="flex gap-28">
          <div className="flex flex-col gap-7 pl-24">
            <input
              type="text"
              className="h-10 w-[500px] bg-grey-0 rounded-2xl p-8 text-2xl font-mont text-white font-bold"
              placeholder="Name"
            ></input>
            <textarea
              className="h-44 w-[500px] bg-grey-0 rounded-2xl p-8 text-xl font-mont text-white font-semibold"
              placeholder="Message"
            ></textarea>
            <button
              className="h-10 w-[500px] bg-gray-600 rounded-2xl p-8 text-2xl font-mont text-white font-semibold flex justify-center items-center hover:bg-green-0 transition-all duration-1000"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="w-[3px] h-[370px] bg-grey-0 rounded-full"></div>
          <div className="flex flex-col py-14 items-center gap-24">
            <div>
              <div className="text-white font-mont text-sm">
                or send a mail to
              </div>
              <div
                className=" group text-white font-mont text-5xl font-extrabold cursor-pointer"
                onClick={() => {
                  window.location.href = "mailto:zenaani@gmail.com";
                }}
              >
                <span className="text-green-0">zenaani</span>
                <span className="group-hover:text-green-0 transition-all duration-500">
                  @gmail.com
                </span>
              </div>
            </div>

            <div
              className="group flex gap-4 cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/zenaani-suresh-6834ab202/",
                  "_blank"
                );
              }}
            >
              <FaLinkedin className="text-5xl text-white group-hover:text-blue-500 transition-all duration-500" />
              <div className="text-white font-mont text-5xl font-extrabold">
                {" "}
                Zenaani Suresh
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Contact;
