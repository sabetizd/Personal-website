import React, { useEffect, useId, useLayoutEffect, useRef,useState } from "react";
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
  const iconRef = useRef();
  const menuRef = useRef(null);
  const gradRef = useRef();
  const gradId = useId();


  const myImageRef = useRef();
  const greetingsRef = useRef();
  const designerRef = useRef();

  
  
  useEffect(() => {
    toggleMenuAnimation()
    toggleMenuItemsAnimation()
  }, [toggle]);
  
  useEffect(()=>{

    // icon gradient animation
    if(!gradRef.current)
      return;
    const tween = gsap.to(`#${gradId}`,
      {
        attr: { gradientTransform: "rotate(360 0 0)" },
        duration: 3,
        repeat: -1,      
        ease: "power1.inOut"}
    )

    return ()=> tween.kill();
  },[gradId])


  const toggleMenuAnimation=()=>{
    if (!menuRef.current) return;

    const rotateDur = 1;

    gsap.killTweensOf([menuRef.current,iconRef.current])
    const tl = gsap.timeline();
    if (toggle) {
      
      tl.to(menuRef.current, { display: "block",height:0, })
      tl.to(menuRef.current, { height: "100svh", duration: 1, ease: "power2.out" })
      tl.to(iconRef.current, {rotateZ:90 ,opacity:0,duration:rotateDur,ease:"power2.out"},0.5)
      tl.call(()=>setmenuIcon('x'),null)
      //tl.to({},{duration:0.005},">")
      tl.fromTo
      (iconRef.current,
        {rotateZ:-90,opacity:0},
        {rotateZ:0,opacity:1,duration:rotateDur,ease:"power1.in",
          immediateRender: false }// (if not set gsap will setdefault from to props from begining (use it to have you min queue))
      )

      
      
    } else {
      tl.to(menuRef.current, { height: '0', duration: 1, ease: "power2.in" })
      tl.to(menuRef.current, { display: "none"})
      tl.to(iconRef.current, {rotateZ:90 ,opacity:0,duration:rotateDur,ease:"power2.out"},0.5)
      tl.call(()=>setmenuIcon('logs'),null)
      tl.to({},{duration:0.05},">")
      tl.fromTo
      (iconRef.current,
        {rotateZ:-90,opacity:0},
        {rotateZ:0,opacity:1,duration:rotateDur,ease:"power2.out",
          immediateRender: false }// (if not set gsap will setdefault from to props from begining (use it to have you main queue))
      )
    }


    return tl.eventCallback("onComplete",()=>tl.kill());
    
  }

  const toggleMenuItemsAnimation=()=>{

    // toggle items animation

    const tls = gsap.utils.toArray(".toggle-items").map((item) => {
      return gsap.timeline({ paused: true })
        .fromTo(item,
          { y: -20, opacity: 0  },
          { y: 0, opacity: 1,delay:toggle ? 2:0, duration: 0.7, ease: "power2.out" }
        );
    });
    toggle ? tls.forEach(tl=>tl.play()) : tls.forEach(tl => tl.progress(1).reverse());



    // toggle items containers animation

    const tls2 = gsap.utils.toArray(".item-containers").map((item)=>{
       return gsap.timeline({paused:true})
        .fromTo(item, 
         {
           y: -15,
           opacity:0,
         },
         {
         y : 0,
         opacity: 1,
         duration: 0.7,
         ease: "power2.out",
         delay:toggle ? 2 : 0
       });
     });

    toggle ? tls2.forEach(tl=>tl.play()) : tls2.forEach(tl=>tl.progress(1).reverse())

    // introduce animations

    const tl3 = gsap.timeline({paused:true})
    .fromTo(greetingsRef.current,
      {
        y : -15,
        opacity : 0,
      }
      ,{
        y : 0,
        opacity : 1,
        duration:0.7,
        delay: toggle ? 3 : 0,
      })
      
    toggle ? tl3.play() : tl3.progress(1).reverse();


    // my image animation

    const tl4 = gsap.timeline({paused:true})
    .fromTo(myImageRef.current,{
      opacity:0,
    },{
      opacity:1,
      duration:0.5,
      delay: toggle ? 3 : 0,
    })

    toggle ? tl4.play() : tl4.progress(1).reverse();
    // social animations

    const socials = gsap.utils.toArray(".social")
      const tl5 = gsap.timeline({paused:true})
      .fromTo(socials,
      {
        y : -15,
        opacity : 0,
      }
      ,{
        y : 0,
        opacity : 1,
        stagger: 0.2,      
        delay:toggle ? 3 : 0,
      })
      toggle ? tl5.play(0) : tl5.progress(0.5).reverse()

      // designer animation

    const tl6 = gsap.timeline({paused:true})
    .fromTo(designerRef.current,
      {
        y : -15,
        opacity : 0,
      }
      ,{
        y : 0,
        opacity : 1,
        duration:0.7,
        delay: toggle ? 3 : 0,
      })
      
    toggle ? tl6.play() : tl6.progress(1).reverse();
    
    


    const cleanAnimations=()=>{
      tls.forEach(tl=>{
        tl.eventCallback('onReverseComplete',()=>{
          tl.kill();
        })
      })
      tls2.forEach(tl=>{
        tl.eventCallback('onReverseComplete',()=>{
          tl.kill();
        })
      })
      tl3.eventCallback("onReverseComplete",()=> tl3.kill())
      tl4.eventCallback("onReverseComplete",()=> tl4.kill())
      console.log("cleaned");
                  
    }


    return cleanAnimations();
  }


          
  return(
    <>
      <div 
      onClick={()=>setToggle(prev=>!prev)}
      className={
        `
        saturate-150
        max-sm:flex hidden       
        size-11 absolute top-3 right-3 items-center justify-center
        hero-glass color-white rounded-2xl z-30
        `}>
          <DynamicIcon ref={iconRef}
          className={`
          drop-shadow-[0px_0px_5px_#ffff]
          `} color="#fff" name={menuIcon}/>
      </div>
      <div ref={menuRef} className="w-full h-0 rounded-none absolute bottom-0 backdrop-blur-[15px] z-10">
            <div className="size-full flex">
              <div className="w-full h-[100svh] pt-[50px] flex justify-evenly flex-col px-4 font-cabin">

                {/*Menu Items*/}
                  <div className="w-full flex flex-col items-center text-white">
                    <div className="item-containers glass-style3 rounded-xl px-3 w-full flex items-center">
                      <a className="toggle-items w-full text-shadow-[0_0_20px_#fff] font-cabin-bold text-4xl flex items-center justify-between" href="#">
                        About
                        <DynamicIcon size={25} name="arrow-up-right"/>
                        </a>
                    </div>
                    <div className="item-containers glass-style3 rounded-xl px-3 w-full flex items-center mt-3">
                      <a className="toggle-items w-full text-shadow-[0_0_20px_#fff] font-cabin-bold text-4xl flex items-center justify-between" href="#">
                        Contact
                        <DynamicIcon size={25} name="arrow-up-right"/>
                        </a>
                    </div>
                  </div>

                {/*Profile Card*/}
                  <div className="w-full h-[100px]">

                    {/*Profile Info*/}
                    <div ref={greetingsRef} className="text-white">
                      <p  className="font-cabin text-center text-[17px]">👋 nice to meet you</p>
                      <p  className="flex items-center text-center justify-center text-[15px] tracking-wider">
                        I'm Ali
                        'Frontend Developer'&nbsp;
                      </p>
                      <div className="w-full flex items-center justify-center gap-2 mt-2">

                        <svg width="0" height="0" style={{ position: "absolute" }}>
                          <defs>
                            <linearGradient
                              id={gradId}
                              ref={gradRef}
                              gradientUnits="userSpaceOnUse"
                              x1="0"
                              y1="0"
                              x2="40"
                              y2="40"
                              gradientTransform="rotate(0 20 20)"
                            >
                              <stop offset="0%" stopColor="#711e00" />
                              <stop offset="50%" stopColor="#e03905" />
                              <stop offset="100%" stopColor="#f3c229" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <DynamicIcon className="inline-block drop-shadow-[0_0_5px_#903f05]" strokeWidth={1.7} size={40} 
                        style={{ stroke: `url(#${gradId})` }}
                        name="codesandbox"/>
                      </div>

                    </div>
                  </div>

                {/*Profile Image & Socials*/}
                  <div className="w-full ">
                      <img ref={myImageRef} className=" rounded-2xl inline-block" src="imgs/my1.png" alt="ali image" />
                  </div>

                {/*Socials*/}
                  <div className="w-full flex flex-row justify-evenly ">
                       <a href="">
                         <DynamicIcon className="social drop-shadow-[0_0_5px_#fff]" color="#fff" strokeWidth={1.75} size={25} name="github"/>
                       </a>
                       <a href="">
                         <DynamicIcon className="social drop-shadow-[0_0_5px_#fff]" color="#fff" strokeWidth={1.75} size={25} name="instagram"/>
                       </a>
                       <a href="">
                         <DynamicIcon className="social drop-shadow-[0_0_5px_#fff]" color="#fff" strokeWidth={1.75} size={25} name="linkedin"/>
                       </a>
                       <a href="">
                            <svg 
                              viewBox="0 0 24 24"
                              width="25"
                              height="25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="social drop-shadow-[0_0_5px_#fff]"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="1.75"></g>
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
                       </a>
                  </div>

                {/* sign */}
                  <div ref={designerRef} className="w-full mt-3 text-white flex flex-col items-center justify-center">
                      <div className="flex flex-col text-[12px] items-center justify-center text-center">
                        <p className="tracking-wide">Designed with <span className="animate-pulse text-[14px]">❤️</span> by
                         ”Ali Sabetizadeh”</p>
                      </div>
                        <p className="text-center text-[10px] mt-2">©2026</p>
                  </div>
              </div>
            </div>
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
