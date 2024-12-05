"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For dynamic route params
import axios from 'axios';
import Link from 'next/link';

function DetailPage() {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [deletebook, setdeletebook] = useState(null);
  const [profile,setProfile]=useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/detail/${id}`);
        setBook(response.data.book);
        setProfile(response.data.profile);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to load book details.');
      }
    };

    if (id) fetchBookDetails();
  }, [id]);

  const deleteBook = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/delete/${id}`);
      console.log("Book deleted successfully:", response.data);
      alert("Book deleted successfully!");
      // Optionally navigate away or update state
      setBook(null); // Clear book details after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete the book.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }



  return (
    <div className="w-full h-screen pt-[10vh] flex justify-center items-center bg-zinc-900">
      <div className="container w-[90%] lg:w-[70%] h-[80%] flex items-center rounded-2xl p-6 bg-zinc-800 shadow-lg">
        {/* Image Box */}
        <div className="w-full lg:w-[40%] h-[70%] rounded-2xl bg-zinc-600 overflow-hidden">
          <img
            src={book.imageurl}
            alt="Book Cover"
            className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Detail Section */}
        <div className="w-full lg:w-[60%] h-[70%] text-center px-5 flex flex-col justify-between">
          <h1 className="text-2xl font-mono font-bold mb-6 mt-4 text-white">
            {book.title}
          </h1>
          <p className="text-[12px] opacity-70 font-mono  h-full text-white leading-relaxed">
            {book.description}
          </p>
          <div className='flex justify-evenly mt-2'> 
        <button onClick={deleteBook} className=' py-2 px-3 bg-red-600 rounded-md hover:bg-red-700 transition-all duration-700 font-mono'>Delete-Book</button>
        <Link href={`/update/${book._id}`}>
        <button  className='px-3 py-2 bg-blue-500 rounded-xl hover:bg-blue-700 duration-300 font-mono'>Update Book</button>
        </Link>
        <Link href={`/user/profile/${profile._id}`}>
      <img className='w-10 h-10 bg-slate-500 rounded-full' src={profile.userImage} alt="sadsad dfsd " />     
        </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
