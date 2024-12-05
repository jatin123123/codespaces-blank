'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



function page() {
    const [user,setUser]=useState("");
const {id}=useParams();
useEffect(()=>{
    const fetchUser=async()=>{
        try {
            const responce=await axios.get(`http://localhost:4000/user/${id}`)
            setUser(responce.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
},[id])
  return (
    <div className='w-full flex items-center justify-center h-screen pt-20 '>
        <div className='w-[70%] flex h-[80%]' id="box">
            <img className='w-72 h-72 rounded-full bg-gray-200' src={user.userImage} alt="" />
            <div id="detail" className=' text-xl font-mono h-72 flex-col justify-center flex px-20 -mt-10'>
                <h1 >{user.userName||"Username"}</h1>
                <h3>{user.email||"user3@gmail.com"}</h3>
            </div>
        </div>
    </div>
  )
}

export default page