"use client";
import React, { useState } from "react";
import axios from "axios";

function NewBook() {
  const [formData, setFormData] = useState({
    imageurl: "",
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:4000/create", formData);
      alert(response.data); // Display success message
      setFormData({ imageurl: "", title: "", description: "" }); // Reset form fields
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book. Please check your backend.");
    }
  };

  return (
    <div className="w-full h-screen pt-[10vh] flex items-center justify-center">
      <div id="box" className="w-[30%] h-[50%] bg-zinc-900 rounded-3xl flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center">
          <input
            value={formData.imageurl}
            onChange={handleChange}
            className="font-mono text-zinc-900 rounded-full text-center px-8 py-2"
            type="text"
            name="imageurl"
            placeholder="Image-Url"
          />
          <input
            value={formData.title}
            onChange={handleChange}
            className="font-mono text-zinc-900 rounded-full text-center px-8 py-2"
            type="text"
            name="title"
            placeholder="Book-Title"
          />
          <input
            value={formData.description}
            onChange={handleChange}
            className="font-mono text-zinc-900 rounded-full text-center px-8 py-2"
            type="text"
            name="description"
            placeholder="Description"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-mono font-bold bg-blue-500 hover:bg-blue-700 text-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBook;
  