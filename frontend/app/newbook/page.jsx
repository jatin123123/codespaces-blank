import Link from 'next/link'
import React from 'react'

function newbook() {
  return (
   <div className='w-full h-screen pt-[10vh] flex items-center justify-center'>
    <div id="box" className='w-[30%] h-[50%] bg-zinc-900 rounded-3xl flex flex-col items-center justify-center'>
  < form action="submit" className='flex flex-col gap-5  items-center justify-center'>
  <input className=' font-mono text-zinc-900 rounded-full text-center px-8 py-2' type="text" name='imageurl' placeholder='Image-Url' />
  <input className=' font-mono text-zinc-900 rounded-full text-center px-8 py-2' type="text" name='title' placeholder='Book-Title' />
  <input className=' font-mono text-zinc-900 rounded-full text-center px-8 py-2' type="text" name='description' placeholder='Description' />
    <button className='px-6 py-2 rounded-full font-mono font-bold bg-blue-500'>Create</button>
  </form>     
    </div>
   </div>
  )
}

export default newbook