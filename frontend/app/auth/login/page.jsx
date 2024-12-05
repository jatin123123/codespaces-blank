'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
    const router=useRouter();
    const [formdata,setFormData]=useState({
    
        password:"",
        email:"",
        
    })
    const handelchange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        setFormData({...formdata,[name]:value})
    }
    async function login (e){
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:4000/login',formdata,{
                withCredentials:true
            });
            alert(response.data);
            router.push("/feed");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='max-w-screen-md flex items-center justify-center m-auto  h-screen '>
        <div id="box" className=' text-sm text-gray-700 w-72 h-48 bg-zinc-900 rounded-2xl'>
            <h1 className='text-white text-center pt-2 text-xl font-mono'>Login</h1>
            <form className='flex flex-col justify-center  items-center h-full w-full' onSubmit={login} >
            <input className='px-3 py-1 rounded-lg mb-2' onChange={handelchange} type="text" placeholder='Enter your email' name="email" value={formdata.email}  />
            <input className='px-3 py-1 rounded-lg  ' onChange={handelchange} type="text" placeholder='password' name='password' value={formdata.password} />
            <button className='px-4 py-2 bg-blue-500  mt-2 rounded-2xl '>login</button>
            </form>
        </div>
    </div>
  )
}

export default page