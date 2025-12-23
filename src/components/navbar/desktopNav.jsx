import React from 'react'

export default function DesktopNav() {
  return (
    <div className='w-[300px] h-8 bg-amber-600 rounded-xl absolute top-10 right-3.5'>
      <div className='size-full flex items-center'>
        <ul className='[&>li]:inline-block flex items-center'>
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  )
}
