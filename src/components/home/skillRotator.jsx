import React, { useEffect } from "react";
import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { DynamicIcon } from "lucide-react/dynamic";

export default function SkillRotator() {
  const slogs = useMemo(
    () => [
      { text: "fast interfaces", icon: "sparkles" },
      { text: "scalable systems", icon: "expand" },
      { text: "purposeful interactions", icon: "slack" },
      { text: "unique interfaces", icon: "gem" },
    ],
    []
  );
  const iconRef = useRef(null)
  const [iconSize,setIconSize] = useState()
  const getIconSize = ()=>{
   return iconRef.current;
  }

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
      (parseFloat(cs.paddingLeft || "0") || 0) +
      (parseFloat(cs.paddingRight || "0") || 0);

    return meas.getBoundingClientRect().width + padX;
  };

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const display = displayRef.current;
    if (!slot || !display) return;

    const start = () => {
      const cs = getComputedStyle(slot);
      const padX =
        (parseFloat(cs.paddingLeft || "0") || 0) +
        (parseFloat(cs.paddingRight || "0") || 0);

      gsap.set(slot, {
        width: display.getBoundingClientRect().width + padX +24,
      });

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

        tl.to(
          display,
          { y: -12, opacity: 0, duration: 0.35, ease: "power2.in" },
          0
        );

        tl.call(
          () => {
            // ضد چشمک: مطمئن شو invisible می‌مونه
            gsap.set(display, { opacity: 0, y: 12 });
            setI((prev) => (prev + 1) % slogs.length);
          },
          null,
          ">"
        );

        // 4) یک فریم فرصت برای React
        tl.to({}, { duration: 0.016 }, ">");

        // 5) ورود متن جدید
        tl.to(
          display,
          { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" },
          ">"
        );

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
  },[]);


  const handleIconSizeRef = (node) => {
    if (node && node instanceof SVGSVGElement) {
      const computedStyle = window.getComputedStyle(node);
      console.log(computedStyle.width)
       return computedStyle.width

    }
  };


  return (
    <div className="mt-14 bg-transparent flex items-center font-cabin pl-2">
      <p className="text-right text-white text-4xl flex flex-row items-center
      max-sm:text-sm">
        I build&nbsp;
        <span
          ref={slotRef}
          className="py-2 px-4 glass-style3 rounded-full relative inline-flex overflow-hidden items-center whitespace-nowrap align-baseline
          max-md:py-1 max-md:px-2"
        >
          {/* نمایش واقعی */}
          <span
            ref={displayRef}
            className="flex items-center justify-center whitespace-nowrap will-change-transform"
          >
            <span className="max-sm:ml-1">{current.text}</span>&nbsp;
            <DynamicIcon
              ref={handleIconSizeRef}
              className={`shrink-0 inline-block drop-shadow-[0_0_10px_#fff] 
                max-sm:size-[18px]
                md:size-[20px] 
                lg:size-[25px] 
                xl:size-[30px] `}
              strokeWidth={1.75}        
              name={current.icon}
            />
          </span>

          {/* measurer مخفی: phrase بعدی رو رندر می‌کنه فقط برای اندازه‌گیری */}
          <span
            ref={measureRef}
            className="absolute -z-10 opacity-0 pointer-events-none whitespace-nowrap inline-flex items-center"
            aria-hidden="true">
            <span>{next.text}</span>&nbsp;
            <DynamicIcon
              className="shrink-0 inline-block"
              size={28}
              name={next.icon}
            />
          </span>
        </span>
      </p>
    </div>
  );
}
