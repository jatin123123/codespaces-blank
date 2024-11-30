import React from 'react'
import { MdOutlineEdit } from "react-icons/md";

function Detailpage() {
  return (
    <div className="w-full h-screen pt-[10vh] flex justify-center items-center bg-gray-900">
      <div className="container w-[90%] lg:w-[70%] h-[80%] flex items-center rounded-2xl p-6 bg-gray-800 shadow-lg">
        {/* Image Box */}
        <div className="w-full lg:w-[40%] h-[70%] rounded-2xl bg-gray-600 overflow-hidden">
          <img src="path_to_image.jpg" alt="Book Cover" className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-all duration-300" />
        </div>

        {/* Detail Section */}
        <div id="detail" className="w-full relative  lg:w-[60%] h-[70%] text-center px-5 flex flex-col justify-between">
          <h1 className="text-2xl font-mono font-bold mb-6 mt-4 text-white flex justify-center items-center">
            Book Title
            <span className="ml-2 text-lg text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">
              <MdOutlineEdit />
            </span>
          </h1>
          <p className="text-base  font-mono opacity-80 text-white leading-relaxed">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates enim accusantium nesciunt eum provident esse quis sed, architecto, ut incidunt deserunt possimus nobis vel iste sint adipisci eligendi earum alias voluptatum at, repellat dolores? Enim quae adipisci illo animi ad sequi consectetur sunt perspiciatis. Provident odit qui laborum exercitationem, quibusdam nobis expedita hic ab illo facilis illum quos ut cumque!
          </p>
          <div className="mt-4">
            <span className="ml-2 text-lg absolute right-0 bottom-8 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">
              <MdOutlineEdit />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detailpage;
