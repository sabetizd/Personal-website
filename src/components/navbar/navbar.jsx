import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { DynamicIcon } from "lucide-react/dynamic";

gsap.registerPlugin(useGSAP, SplitText);

export default function Navbar() {
  useGSAP(() => {
    const links = gsap.utils.toArray(".menu-items");

    const items = links.map((el) => {

      const split = new SplitText(el, { type: "chars", charsClass: "char" });

     

      const tl = gsap.timeline({ paused: true, repeat: 0 });

      tl.fromTo(
        split.chars,
        { perspective: 0, rotateZ: 0 },
        {
          perspective: 1000,
          rotateZ: 360,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.inOut",
          transformStyle:"preserve-3d"
        }
      );

      const onEnter = () => tl.play(0);
      const onLeave = () => {
        tl.reverse();
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return { el, split, tl, onEnter, onLeave };
    });

    return () => {
      // cleanup
      items.forEach(({ el, split, tl, onEnter, onLeave }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        tl.kill();
        split.revert(); // متن رو به حالت قبل برگردون
      });
    };
  });

  return (
    <div
      className="h-10 absolute top-10 right-[5%] rounded-3xl 
      outer-glass inner-glass"
    >
      {/* glass highlight */}

      <div className=" absolute rounded-3xl" />

      <div className="size-full flex items-center">
        <ul
          className="[&>li]:inline-block [&>li]:mx-2 [&>li]:cursor-pointer [&>li]:px-1 
          max-md:text-[12px]
          flex items-center text-[19px] font-cabin text-white"
        >
          <li className="menu-items">Home</li>
          <li className="menu-items">About</li>
          <li className="menu-items ml-5!">
              <span>Contact Me</span>
            <DynamicIcon
              className="inline-block"
              size={18}
              name="arrow-up-right"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

