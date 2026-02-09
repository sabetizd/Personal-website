import { useEffect, useLayoutEffect, useRef } from "react";
import GradientBlinds from "./GradientBlinds ";
import Beams from "./beam";
import SidePanel from "../sidePanel/sidePanel";
import Navbar from "../navbar/navbar";
import Hero from "./hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  
  useGSAP(()=>{
    gsap.utils.toArray('.panel').forEach((panel,i)=>{
      ScrollTrigger.create({
        trigger:panel,
        start:'top top',
        pin:true,
        pinSpacing:false,
        
      })
    })
  })

  return (
    <>
      <div className="relative">
        <div className="panel h-screen w-full max-md:!hidden ">
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
        <SidePanel />
        <Hero />
        <Navbar />

        </div>

        <div className="h-svh w-full max-md:flex min-md:!hidden panel">
          {" "}
          {/* Mobile */}
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

        <Hero />
        <Navbar />
        </div>


        <div id="sec1" className="panel bg-amber-400"></div>
        <div id="sec2" className="panel bg-blue-400"></div>
        <div id="sec3" className="panel bg-green-400"></div>
      </div>
    </>
  );
}

export default Home;
