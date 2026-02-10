import GradientBlinds from "./GradientBlinds ";
import Beams from "./beam";
import SidePanel from "../sidePanel/sidePanel";
import Navbar from "../navbar/navbar";
import Hero from "./hero";



function Home() {
  
  
  return (
    <>
    <style>
      {`
        .panel{
          width:100%;
          height:100svh;
          position:relative;

        }
      `}
    </style>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="panel">

          {/* Desktop */}
          <div className="h-screen w-full max-md:!hidden ">
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
          </div>

          {/* Mobile */}
          <div className="h-svh w-full max-md:flex min-md:hidden">
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
          </div>

          <Hero />

        </div>

       

      </div>
      
    </>
  );
}

export default Home;
