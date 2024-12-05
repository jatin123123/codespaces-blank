"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/verify", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        const user = response.data;
        setUser(user);
      } catch (error) {}
    };
    verifyUser();
  });
  return (
    <div className="w-full items-center justify-center flex  h-screen ">
      <div
        id="card"
        className="w-[70%] gap-20 h-[70%] flex bg-zinc-800 items-center  rounded-lg"
      >
        <img
          className="w-72 h-72 rounded-full bg-white ml-5"
          src={user.userImage}
          alt="sadfsd"
        />
        <div id="content" className="text-2xl font-mono">
          <h1>{user.userName}</h1>
          <h4>{user.email}</h4>
          <div className="w-full mt-7 flex justify-evenly">
            <button className="px-3 py-2 rounded-md bg-blue-500 text-sm ">
              Update-User
            </button>
            <button className="px-3 py-2 rounded-md bg-red-500 text-sm ">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
