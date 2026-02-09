import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Test() {

  useGSAP(()=>{
    gsap.utils.toArray('.panel').forEach((panel,i)=>{
      ScrollTrigger.create({
        trigger:panel,
        start:'top top',
        pin:true,
        pinSpacing:false,
        scrub:5,
      })
    })
  })

  return (
   <>
    <div className="relative w-full ">
      <section className="panel bg-amber-500">
        One
      </section>
       <section className="panel bg-red-500">
        Two
      </section>
       <section className="panel bg-green-500">
        Three
      </section>
       <section className="panel bg-blue-500">
        Four
      </section>
    </div>
   
   </>
    
  );
}
