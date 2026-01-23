import { useEffect, useLayoutEffect, useRef } from "react";
import GradientBlinds from "./GradientBlinds ";
import Beams from "./beam";
import SidePanel from "../sidePanel/sidePanel";
import Navbar from "../navbar/navbar";
import Hero from "./hero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  

  return (
    <>
      <div className="">
        <div className="h-screen w-full max-md:hidden flex z-10 relative">
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
        </div>

        <div className="h-svh w-full relative max-md:flex hidden">
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
        </div>

        <Navbar />
      </div>
    </>
  );
}

export default Home;
