'use client'
import axios from 'axios';
import React, { useState } from 'react'

function page() {
    const [formdata,setFormData]=useState({
        userImage:"",
        password:"",
        email:"",
        userName:""
    })
    const handelchange=(e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        setFormData({...formdata,[name]:value})
    }
    async function signup (e){
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:4000/signup',formdata);
            alert(response.data);
            setFormData({ userImage: "", title: "", description: "" });
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='max-w-screen-md flex items-center justify-center m-auto  h-screen '>
        <div id="box" className=' text-sm text-gray-700 w-72 h-80 bg-zinc-900 rounded-2xl'>
            <form className='flex flex-col justify-center  items-center h-full w-full' onSubmit={signup} >
            <img  className='w-24 h-24 rounded-full bg-white mb-3' src={formdata.userImage||`https://static.vecteezy.com/system/resources/previews/010/056/184/large_2x/people-icon-sign-symbol-design-free-png.png`} alt="d" />
            <input className='px-3 py-1 rounded-lg  mt-2 mb-2' type="text" value={formdata.userImage} name="userImage" placeholder='enter image url' onChange={handelchange} />
            <input className='px-3 py-1 rounded-lg  mb-2' onChange={handelchange} type="text" value={formdata.userName} name='userName' placeholder='Enter Your userName' />
            <input className='px-3 py-1 rounded-lg mb-2' onChange={handelchange} type="text" placeholder='Enter your email' name="email" value={formdata.email}  />
            <input className='px-3 py-1 rounded-lg  ' onChange={handelchange} type="text" placeholder='password' name='password' value={formdata.password} />
            <button className='px-3 py-2 bg-blue-500  mt-2 rounded-2xl '>Signup</button>
            </form>
        </div>
    </div>
  )
}

export default page