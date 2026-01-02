import { React, useRef } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function SidePanel() {
  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power1.inOut" },
    });
    //tl.to("#progress",{height:"5%",duration:0.5})
    tl.to("#progress", {
      translateY: "2100%",
      height: "10%",
      display: "block",
      duration: 3,
    }).to("#progress", { x: 0, display: "none", duration: 1 });
  }, []);
  return (
    <>
      <div
        className="absolute px-2 py-2 h-[90svh] flex flex-col items-center translate-y-[-50%] top-[50%] left-5 rounded-3xl outer-glass inner-glass 
    [&>div]:mt-1"
      >
        <div className="w-full h-9 flex justify-center items-center">
          <MagneticIcon>
            <a href="">
              <img
                className="size-[38px] inline-block"
                src="imgs/s_logo.png"
                alt=""
              />
            </a>
          </MagneticIcon>
        </div>
        <div
          className="w-full h-[65%] flex flex-col items-center
        [&>div]:bg-white"
        >
          <div className="size-[6px] rounded-full"></div>
          <div className="w-px h-[99%] !bg-gray-400 overflow-hidden relative">
            <div
              id="progress"
              className="absolute -mt-1.5 w-px h-[1%] bg-white"
            ></div>
          </div>{" "}
          {/* progress animation */}
          <div className="size-[6px] rounded-full"></div>
        </div>

        {/*Socials*/}

        <div className="w-full h-[35%]  flex items-center justify-normal flex-col gap-4 pt-3">
          <a className=" p-1 rounded-md" href="#">
            <MagneticIcon>
              <DynamicIcon name="linkedin" size={19} color="white" />
            </MagneticIcon>
          </a>

          <a className=" p-1 rounded-md" href="#">
            <MagneticIcon>
              <DynamicIcon name="instagram" color="white" />
            </MagneticIcon>
          </a>

          <a className="p-1 rounded-md flex justify-center" href="#">
            <MagneticIcon>
              <DynamicIcon name="github" color="white" />
            </MagneticIcon>
          </a>

          <a className=" p-1 rounded-md" href="#">
            <MagneticIcon>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>
              </svg>
            </MagneticIcon>
          </a>
        </div>
      </div>
    </>
  );
}

const MagneticIcon = ({ children, strength = 100 }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2); // clientX/Y = mouse position in viewport(x from left, y from top)
    const relY = e.clientY - (r.top + r.height / 2);

    const x =
      relX * 0.55 > strength
        ? strength
        : Math.max(-strength, Math.min(strength, relX * 0.55));
    const y =
      relY * 0.55 > strength
        ? strength
        : Math.max(-strength, Math.min(strength, relY * 0.55));

    gsap.to(ref.current, {
      x,
      y,
      scale: 1.2,
      duration: 0.25,
      ease: "power3.out",
      overwrite: "auto", // to prevent conflicts with onMove animations(to much mouse move events)
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "bounce",
      overwrite: "auto",
    });
  };

  return (
    <span
      className="will-change-transform inline-block" // will-change:TRANSFORM - for better GPU render performance
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={ref}
    >
      {children}
    </span>
  );
};

export default SidePanel;
