'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Nav() {
  const [verify,setverify]=useState(false);
  const [user,setUser]=useState("");
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/verify", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        
        if (response.status === 200) {
          setverify(true); // User is authenticated
          const user=response.data;
          setUser(user);
        }
      } catch (error) {
       
      }
    };

    verifyUser();
  }, []); //
  return (
    <nav className="w-full flex justify-between backdrop-blur-xl bg-[#3a3a3a31] border-b fixed py-4 border-gray-600 px-5 text-pretty font-mono">
      <Link href={'/feed'}> <h1>Bookooo</h1></Link>
      <div className="flex gap-4">
        <a href="#">About</a>
        <a href="#">Help</a>
        <a href="#">Contact</a>
        {verify ? (
          <>
                <Link href={'/newbook'}>
        <button className='px-2 py-1 item-center -mt-1 bg-blue-500 rounded-2xl'>
          Create
        </button>
      </Link>
          <Link href={`/admin/${user._id}`}>
          <img className='w-7 h-7 rounded-full' src={user.userImage} alt="" />
          </Link>
          </>

    ) : (
      <>
        <Link className='px-2 py-1 item-center -mt-1 bg-blue-500 rounded-2xl' href={'/auth/signup'}>
          Signup
        </Link>
        <Link className='px-3 py-1 item-center -mt-1 bg-[#ffffff49] rounded-2xl' href={'/auth/login'}>
          Login
        </Link>
      </>
    )}
      </div>
    </nav>
  )
}

export default Nav