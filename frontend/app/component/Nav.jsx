import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <nav className="w-full flex justify-between backdrop-blur-xl bg-[#3a3a3a31] border-b fixed py-4 border-gray-600 px-5 text-pretty font-mono">
   <Link href={'/'}> <h1>Bookooo</h1></Link>
      <div className="flex gap-4">
        <a href="#">About</a>
        <a href="#">Help</a>
        <a href="#">Contact</a>
       <Link href={'/newbook'}>
       <button className='px-2 py-1 item-center -mt-1 bg-blue-500 rounded-2xl'>Create</button>
       </Link> 
      </div>
    </nav>
  )
}

export default Nav