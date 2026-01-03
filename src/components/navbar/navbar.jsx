import React, { useEffect, useLayoutEffect, useRef,useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { DynamicIcon } from "lucide-react/dynamic";


gsap.registerPlugin(useGSAP, SplitText);

export default function Navbar() {
 
  return (
   <>
      <div>
        <MobileNavbar />
      </div>

      <div className="max-sm:hidden flex">
        <DesktopNavbar />
      </div>
   </>
  );
}

const MobileNavbar = () => {
  const [toggle,setToggle] = useState(false);
  const [menuIcon,setmenuIcon] = useState('logs')
  const iconRef = useRef()
  const menuRef = useRef(null);
  
  useEffect(() => {
    toggleMenuAnimation()
  }, [toggle]);

  const toggleMenuAnimation=()=>{
    if (!menuRef.current) return;

    const rotateDur = 0.5;

    gsap.killTweensOf([menuRef.current,iconRef.current])
    const tl = gsap.timeline();
    if (toggle) {
      
      tl.to(menuRef.current, { display: "block",height:0, })
      tl.to(menuRef.current, { height: "100svh", duration: 1, ease: "power2.in" })
      tl.to(iconRef.current, {rotateZ:90 ,opacity:0,duration:rotateDur,ease:"power2.out"},1)
      tl.call(()=>setmenuIcon('x'),null)
      //tl.to({},{duration:0.005},">")
      tl.fromTo
      (iconRef.current,
        {rotateZ:-90,opacity:0},
        {rotateZ:0,opacity:1,duration:rotateDur,ease:"power2.in",
          immediateRender: false }// (if not set gsap will setdefault from to props from begining (use it to have you min queue))
      )

      
      
    } else {
      tl.to(menuRef.current, { height: '0', duration: 1, ease: "power2.in" })
      tl.to(menuRef.current, { display: "none"})
      tl.to(iconRef.current, {rotateZ:90 ,opacity:0,duration:rotateDur,ease:"power2.out"},1)
      tl.call(()=>setmenuIcon('logs'),null)
      tl.to({},{duration:0.05},">")
      tl.fromTo
      (iconRef.current,
        {rotateZ:-90,opacity:0},
        {rotateZ:0,opacity:1,duration:rotateDur,ease:"power2.out",
          immediateRender: false }// (if not set gsap will setdefault from to props from begining (use it to have you min queue))
      )
    }

   
  }
  
  return(
    <>
      <div 
      onClick={()=>setToggle(prev=>!prev)}
      className={
        `
        saturate-150
        max-sm:flex hidden       
        size-11 absolute top-5 right-5 items-center justify-center
        hero-glass color-white rounded-2xl z-30
        `}>
          <DynamicIcon ref={iconRef}
          className={`
          drop-shadow-[0px_0px_5px_#ffff]
          `} color="#fff" name={menuIcon}/>
      </div>
      <div ref={menuRef} className="w-full h-0 rounded-none absolute bottom-0 backdrop-blur-sm z-10">
            
      </div>
    </>
  )
}

const DesktopNavbar = () => {
   useGSAP(() => {

    const links = gsap.utils.toArray(".menu-items");

    const items = links.map((el) => {
    const split = new SplitText(el, 
      { type: "chars", // split words into unique characters
        charsClass: "char" // give each character a class name (here is .char)
      }
    );

    const tl = gsap.timeline(
      { paused: true, // prevents the animatoin from playing fromt start
        repeat: 0 
      }
    );

    tl.fromTo(
      split.chars,
      {perspective: 0, rotateZ: 0 },
      {
        perspective: 1000,
        rotateZ: 360,
        stagger: 0.03,
        duration: 0.5,
        ease: "power2.inOut",
        transformStyle: "preserve-3d",// keeps 3D effect
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
