import React from 'react'
import GradientBlinds from './GradientBlinds '

function Home() {
  return (
    <div className='h-svh w-full relative'>
        <GradientBlinds
            gradientColors={['#eb8615', '#903f05']}
            angle={30}
            noise={0.1}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.5}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
        />
    </div>
  )
}

export default Home