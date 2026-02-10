import { useRef } from "react";
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
        className="absolute px-2 py-2 h-[92svh] flex flex-col items-center translate-y-[-50%] top-[50%] left-5 rounded-[26px] outer-glass inner-glass 
        [&>div]:mt-1
        max-md:z-10 max-md:left-3"
      >
        <div className="w-full h-9 flex justify-center items-center relative">
          <MagneticIcon>
            <a href="#">
              <img
                className="size-[38px] inline-block z-100"
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
          <div className="w-px h-[99%] bg-gray-400! overflow-hidden relative">
            <div
              id="progress"
              className="absolute -mt-1.5 w-px h-[1%] bg-white"
            ></div>
          </div>{" "}
          {/* progress animation */}
          <div className="size-[6px] rounded-full"></div>
        </div>

        {/*Socials*/}

        <div className="w-full flex items-center justify-normal flex-col gap-4 pt-3">
          <a
            className=" p-1 rounded-md"
            target="_blank"
            href="https://www.linkedin.com/in/sabetizd/"
          >
            <MagneticIcon>
              <DynamicIcon name="linkedin" size={19} color="white" />
            </MagneticIcon>
          </a>

          <a className="p-1 rounded-md">
            <MagneticIcon>
              <DynamicIcon name="instagram" color="white" />
            </MagneticIcon>
          </a>

          <a
            className="p-1 rounded-md flex justify-center"
            target="_blank"
            href="https://github.com/sabetizd"
          >
            <MagneticIcon>
              <DynamicIcon name="github" color="white" />
            </MagneticIcon>
          </a>

          <a className=" p-1 rounded-md" target="_blank" href="https://sabetizd.t.me/">
            <MagneticIcon>
              <svg
                width="25"
                height="25"
                viewBox="-4.8 -4.8 57.60 57.60"
                id="Layer_2"
                data-name="Layer 2"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-width="2.0"
                transform="rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <defs></defs>

                  <path
                    class="cls-1"
                    d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z"
                  />
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
