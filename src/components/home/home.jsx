import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import GradientBlinds from "./GradientBlinds ";
import Beams from "./beam";
import SidePanel from "../sidePanel/sidePanel";
import { gsap } from "gsap";
import { DynamicIcon } from "lucide-react/dynamic";
import Navbar from "../navbar/navbar";

function Home() {
  const [largeScreen, setLargeScreen] = useState(
    () => !window.matchMedia("(max-width : 1024px)").matches
  );

  useEffect(() => {
    const mobile = window.matchMedia("(max-width : 1024px)");
    const linstener = mobile.addEventListener("change", () => {
      setLargeScreen(!mobile.matches);
    });

    heroAnimation()
    heroAnim()
    return () => {
      mobile.removeEventListener("change", linstener);
    };
  }, []);

  return (
    <>
      <div className="h-svh w-full relative">
        {largeScreen ? (
          <GradientBlinds
            gradientColors={["#eb8615", "#903f05"]}
            angle={30}
            noise={0}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={0.5}
            spotlightOpacity={0.5}
            mouseDampening={0.5}
            distortAmount={1}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        ) : (
          <Beams
            beamWidth={0.75}
            beamHeight={15}
            beamNumber={12}
            lightColor="#eb8615"
            speed={3}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        )}
        <Navbar />

        <div id="hero" className=" absolute top-[40%] left-[50%] translate-[-50%] group font-cabin text-center py-6 px-20 text-white rounded-full">
          <p className="text-[30px] hero-hi">Hi! i’m Ali</p>
          <div className="hero-title-wrap overflow-hidden mt-7">
            <p
            className="hero-title text-[80px] text-[#F8F8F800]"
            style={{
                WebkitTextStrokeWidth: "1px",
                WebkitTextStrokeColor: "#fff",
            }}
            >
            {["F","r","o","n","t","e","n","d"," ","D","e","v","e","l","o","p","e","r"].map(
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
          </div>
        </div>
            <SkillRotator/>
      </div>
      <SidePanel />
    </>
  );
}


export const heroAnimation = () => {
  

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

  tl.to(".hero-glass", {

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

const heroAnim = () => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;
  const chars = document.querySelectorAll(".code-char");

  gsap.set(chars, { opacity: 1 });

  gsap.timeline({
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


export const SkillRotator = () => {
  const slogs = useMemo(
    () => [
      { text: "fast interfaces", icon: "sparkles" },
      { text: "scalable systems", icon: "expand" },
      { text: "purposeful interactions", icon: "slack" },
      { text: "products users don’t fight", icon: "gem" },
    ],
    []
  );

  const [i, setI] = useState(0);
  const current = slogs[i];
  const next = slogs[(i + 1) % slogs.length];

  const slotRef = useRef(null);
  const displayRef = useRef(null);
  const measureRef = useRef(null);

  const tlRef = useRef(null);
  const timerRef = useRef(null);

  const measureW = () => {
    const slot = slotRef.current;
    const meas = measureRef.current;
    if (!slot || !meas) return 0;

    const cs = getComputedStyle(slot);
    const padX =
      (parseFloat(cs.paddingLeft || "0") || 0) + (parseFloat(cs.paddingRight || "0") || 0);

    return meas.getBoundingClientRect().width + padX;
  };

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const display = displayRef.current;
    if (!slot || !display) return;

    const start = () => {
     
      const cs = getComputedStyle(slot);
      const padX = (parseFloat(cs.paddingLeft || "0") || 0) + (parseFloat(cs.paddingRight || "0") || 0);

      gsap.set(slot, { width: display.getBoundingClientRect().width + padX + 30});

      const run = () => {
        // timeline قبلی
        if (tlRef.current) tlRef.current.kill();

        const nextW = measureW(); 

        const tl = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            timerRef.current = gsap.delayedCall(0.8, run);
          },
        });

      tl.to(slot, { width: nextW, duration: 0.5, ease: "power2.inOut" }, 0);

      tl.to(display, { y: -12, opacity: 0, duration: 0.35, ease: "power2.in" }, 0);

      tl.call(() => {
        // ضد چشمک: مطمئن شو invisible می‌مونه
        gsap.set(display, { opacity: 0, y: 12 });
        setI((prev) => (prev + 1) % slogs.length);
      }, null, ">");

      // 4) یک فریم فرصت برای React
      tl.to({}, { duration: 0.016 }, ">");

      // 5) ورود متن جدید
      tl.to(display, { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" }, ">");

        tlRef.current = tl;
      };

      // شروع
      timerRef.current = gsap.delayedCall(0.8, run);
    };

    start();

    return () => {
      if (timerRef.current) timerRef.current.kill();
      if (tlRef.current) tlRef.current.kill();
    };

  }, []);

  return (
    <div className="absolute top-[60%] w-[900px] h-[60px] left-[45%] translate-[-50%] bg-transparent flex items-center font-cabin pl-20">
      <p className="text-right text-white text-4xl flex flex-row items-center">
        I build&nbsp;

        <span
          ref={slotRef}
          className="py-2 px-4 hero-glass rounded-full relative inline-flex overflow-hidden items-center whitespace-nowrap align-baseline"
        >
          {/* نمایش واقعی */}
          <span ref={displayRef} className="inline-flex items-center whitespace-nowrap will-change-transform">
            <span>{current.text}</span>&nbsp;
            <DynamicIcon className="shrink-0 inline-block drop-shadow-[0_0_10px_#fff]" strokeWidth={1.75} size={30} name={current.icon} />
          </span>

          {/* measurer مخفی: phrase بعدی رو رندر می‌کنه فقط برای اندازه‌گیری */}
          <span
            ref={measureRef}
            className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap inline-flex items-center"
            aria-hidden="true"
          >
            <span>{next.text}</span>&nbsp;
            <DynamicIcon className="shrink-0 inline-block" size={28} name={next.icon} />
          </span>
        </span>
      </p>
    </div>
  );
};



export default Home;