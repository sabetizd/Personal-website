import { useEffect, useId, useRef,useState } from "react";
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
        size-11 fixed top-3 right-3 items-center justify-center
        hero-glass color-white rounded-2xl z-60
        `}>
          <DynamicIcon ref={iconRef}
          className={`
          drop-shadow-[0px_0px_5px_#ffff]
          `} color="#fff" name={menuIcon}/>
      </div>
      <div ref={menuRef} className="w-full h-0 rounded-none fixed bottom-0 backdrop-blur-[15px] z-50">
            <div className="size-full flex">
              <div className="w-full h-svh pt-[50px] flex justify-evenly flex-col px-4 font-cabin">

                {/*Menu Items*/}
                  <div className="w-full flex flex-col items-center text-white">
                    <div className="item-containers glass-style3 rounded-xl px-3 w-full flex items-center">
                      <a className="toggle-items w-full text-shadow-[0_0_20px_#fff] font-cabin-bold text-4xl flex items-center justify-between" >
                        About
                        <DynamicIcon size={25} name="arrow-up-right"/>
                        </a>
                    </div>
                    <div className="item-containers glass-style3 rounded-xl px-3 w-full flex items-center mt-3">
                      <a className="toggle-items w-full text-shadow-[0_0_20px_#fff] font-cabin-bold text-4xl flex items-center justify-between" >
                        Contact
                        <DynamicIcon size={25} name="arrow-up-right"/>
                        </a>
                    </div>
                  </div>

                {/*Profile Card*/}
                  <div className="w-full h-[100px]">

                    {/*Profile Info*/}
                    <div ref={greetingsRef} className="text-white">
                      <p  className="font-cabin text-center text-[17px]">👋 nice to meet you !</p>
                      <p  className="flex items-center text-center justify-center text-[15px] tracking-wider">
                        I'm Ali a
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
                      <img ref={myImageRef} className=" rounded-2xl inline-block" src="public/imgs/my1.png" alt="ali image" />
                  </div>

                {/*Socials*/}
                  <div className="w-full flex flex-row justify-evenly ">
                       <a target="_blank"
                          href="https://www.linkedin.com/in/sabetizd/">
                         <DynamicIcon className="social drop-shadow-[0_0_5px_#fff]" color="#fff" strokeWidth={1.75} size={25} name="github"/>
                       </a>
                       <a >
                         <DynamicIcon className="social" color="#fff" strokeWidth={1.75} size={25} name="instagram"/>
                       </a>
                       <a target="_blank"
                          href="https://github.com/sabetizd">
                         <DynamicIcon className="social drop-shadow-[0_0_5px_#fff]" color="#fff" strokeWidth={1.75} size={25} name="linkedin"/>
                       </a>
                       <a target="_blank" href="https://sabetizd.t.me/">                          
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
                              className="social drop-shadow-[0_0_5px_#fff]"
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
        split.revert(); 
      });
    };
  });

  return (
    <div
      className="h-10 absolute top-10 right-[5%] rounded-3xl 
      outer-glass inner-glass z-50"
    >
      {/* glass highlight */}

      <div className="absolute rounded-3xl" />

      <div className="size-full flex items-center">
        <ul
          className="[&>li]:inline-block [&>li]:mx-2 [&>li]:cursor-default [&>li]:px-1 
          max-md:text-[12px]
          flex items-center text-[19px] font-cabin text-white"
        >
          <li className="menu-items">Home</li>
          <li className="menu-items">About</li>
          <li className="menu-items ml-5!">
            <a className="cursor-pointer" target="_blank" href="mailto:sabetizd@gmail.com">Contact Me</a>
            <DynamicIcon
              className="inline-block ml-0.5 mb-0.5"
              size={18}
              name="mails"
            />
            
          </li>
        </ul>
      </div>
    </div>
  );

}
