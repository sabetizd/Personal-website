import React, { useEffect } from 'react'
import { gsap } from "gsap";

export default function Hero() {
    useEffect(()=>{
        heroShowAnimation()
        heroTextAnimation()
    })
  return (
    <>
     <div id="hero" className=" absolute top-[40%] left-[50%] translate-[-50%] 
        group font-cabin text-center py-6 px-20 text-white rounded-full
        max-md:px-0">
          <p className={`
            max-md:text-[16px]
            text-[30px] hero-hi
            `}>Hi! i’m Ali</p>
          <div className="hero-title-wrap overflow-hidden mt-7">
            <div
            className={`
              felx flex-col justify-center items-center
              max-md:text-[20px]
              hero-title text-[80px] text-[#F8F8F800]`}
            
            >
             <p >
                {["F","r","o","n","t","e","n","d"," "].map(
                  (char, i) => (
                  <span
                      key={i}
                      className={`char inline-block ${[char,"<",">","_"].includes(char) ? "code-char" : ""}`}
                  >
                      {char === " " ? "\u00A0" : char}
                  </span>
                  )
                )}
              </p>      
              <p> 
                {["D","e","v","e","l","o","p","e","r"].map(
                  (char, i) => (
                  <span
                      key={"X"+i}
                      className={`char inline-block ${[char,"<",">","_"].includes(char) ? "code-char" : ""}`}
                  >
                      {char === " " ? "\u00A0" : char}
                  </span>
                  )
                )}
              </p>    

            </div>
          </div>
        </div>
    </>
  )
}


export const heroShowAnimation = () => {
  

  gsap.set("#hero", {

    opacity: 0,
    scale: 0.3,
    y: 200,
    borderRadius: "12px"
  });

  gsap.set(".hero-hi", {
    opacity: 0,
    y: 10,
  });

  gsap.set(".hero-title", {
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
    .to(".hero-hi", {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.35")
    .to(".hero-title", {
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      color: "#FFFFFF",
      textShadow: "0 0 10px #fff",     
    }, )
    .to(chars, {
      opacity: 0.2,
      duration: 0.12,
      stagger: {
        each: 0.05,
        from: "random",
      },
    },"-=0.4")
    .to(chars, {
      opacity: 1,
      duration: 0.12,
      stagger: {
        each: 0.04,
        from: "random",
      },
    }).to(".hero-title", {
        delay: 1,
        textShadow: "0 0 5px #fff",
    });


};

const heroTextAnimation = () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;
  const chars = document.querySelectorAll(".code-char");

  gsap.set(chars, { opacity: 1 });

  const tl = gsap.timeline({
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

   
}
