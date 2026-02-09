import React, { useEffect } from "react";
import { gsap } from "gsap";
import SkillRotator from "./skillRotator";
import { DynamicIcon } from "lucide-react/dynamic";

export default function Hero() {
  useEffect(() => {
    heroShowAnimation();
    heroTextAnimation();
  });

  const heroShowAnimation = () => {
    gsap.set("#hero", {
      opacity: 0,
      scale: 0.3,
      y: 200,
      borderRadius: "12px",
    });

    gsap.set("#hero-hi", {
      opacity: 0,
      y: 10,
    });

    gsap.set("#hero-title", {
      yPercent: 12,
      opacity: 0,
    });

    const chars = document.querySelectorAll(".code-char");
    gsap.set(chars, { opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to("#hero", {
      opacity: 1,
      scale: 1,
      y: 0,
      borderRadius: "260px",
      duration: 1.5,
    })
      .to(
        "#hero-hi",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.35"
      )
      .to("#hero-title", {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        color: "#FFFFFF",
        textShadow: "0 0 10px #fff",
      })
      .to(
        chars,
        {
          opacity: 0.2,
          duration: 0.12,
          stagger: {
            each: 0.05,
            from: "random",
          },
        },
        "-=0.4"
      )
      .to(chars, {
        opacity: 1,
        duration: 0.12,
        stagger: {
          each: 0.04,
          from: "random",
        },
      })
      .to("#hero-title", {
        delay: 1,
        textShadow: "0 0 5px #fff",
      });

      return tl.eventCallback('onComplete',()=>tl.kill())
  };

  const heroTextAnimation = () => {
    const chars = document.querySelectorAll(".code-char");     
    gsap.set(chars, { opacity: 1 });

    const tl = gsap
      .timeline({
        repeat: -1,
        repeatDelay: 7,
      })
      .to(chars, {
        opacity: 0.2,
        duration: 0.12,
        stagger: {
          each: 0.05,
          from: "random",
        },
      })
      .to(chars, {
        opacity: 1,
        duration: 0.12,
        stagger: {
          each: 0.04,
          from: "random",
        },
      });

      tl.play()
  };

  return (
    <>
      <div      
        className="absolute top-[45%] left-[50%] translate-[-50%]">
          <div id="hero" className="hero-glass group font-cabin text-center py-6 px-20 text-white rounded-full
              max-md:px-4">
              <p
                id="hero-hi"
                className={`
                  text-[5vw]
                  md:text-[18px]
                  lg:text-[25px]
                  xl:text-[30px]
                    `}>
                Hi! i’m Ali
              </p>
              <div
                className="overflow-hidden mt-7
                max-md:mt-4">
                <div
                id="hero-title"
                  className={`
                    felx flex-col
                    max-md:text-[10vw]
                    md:text-[50px]
                    lg:text-[75px]
                    xl:text-[80px]
                    hero-title text-[#F8F8F800]`}>
                  <p className="inline-block">
                    {"Frontend Developer".split("").map((char, i) => (
                      <span key={"X" + i} className={`char code-char`}>
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
          </div>
          <SkillRotator/>
      </div>


      {/* scroll down */}
      <div className="absolute top-[90%] max-md:top-[93%] left-[50%] translate-x-[-50%]">
        <div className="flex flex-col items-center text-white font-cabin">
          <span className="min-md:text-2xl">scroll down</span>
          <DynamicIcon size={19} name="mouse" />
        </div>
      </div>
    </>
  );
}
