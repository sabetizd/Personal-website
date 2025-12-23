import React, { useEffect, useState } from 'react'
import GradientBlinds from './GradientBlinds '
import Beams from './beam'
import DesktopNav from '../navbar/desktopNav';

function Home() {

    const [largeScreen,setLargeScreen] = useState(()=>!window.matchMedia("(max-width : 1024px)").matches);

    useEffect(()=>{
        const mobile = window.matchMedia("(max-width : 1024px)");
        const linstener = mobile.addEventListener("change",()=>{
            setLargeScreen(!mobile.matches);
        })


        return ()=>{mobile.removeEventListener("change",linstener)};
    },[])

  return (
    <div className='h-svh w-full relative'>
        {largeScreen ? 
         <GradientBlinds
            gradientColors={['#eb8615', '#903f05']}
            angle={30}
            noise={0.1}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={0.5}
            spotlightOpacity={0.5}
            mouseDampening={0.5}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
        /> 
        
        :
        <Beams
            beamWidth={0.75}
            beamHeight={15}
            beamNumber={12}
            lightColor="#eb8615"
            speed={3}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
        />}
        <DesktopNav/>
    </div>
    
  )
}

export default Home