"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const [books, setBooks] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/feed", {
          withCredentials: true,
        });
  
        if (response.status === 200) {
          setAuthorized(true);
          const books = response.data;
          setBooks(books);
  
          // Extract unique user IDs
          const userIds = books.map((book) => book.user);
          const uniqueUserIds = [...new Set(userIds)];
  
          // Fetch usernames for each unique user ID
          const usernameRequests = uniqueUserIds.map((userId) =>
            axios.get(`http://localhost:4000/user/${userId}`)
          );
  
          const usernameResponses = await Promise.all(usernameRequests);
  
          // Map user IDs to their usernames
          const usernameMap = usernameResponses.reduce((acc, curr) => {
            console.log("User Response:", curr.data); // Log individual user response
            acc[curr.data._id] = curr.data. userImage; // Assuming response contains { _id, name }
            return acc;
          }, {});
  
          console.log("Username Map:", usernameMap); // Log the final mapping
          setUsernames(usernameMap); // Update state with user ID to username mapping
        }
      } catch (err) {
          setAuthorized(false);
          router.push("/auth/login");
        
      }
    };
  
    fetchBooks();
  }, []);
  

  return (
    <div className="w-full h-screen text-center">
      {/* Navigation */}

      {/* Book Container */}
      <div
        id="container"
        className="max-w-screen-lg m-auto  h-[90vh] pt-[15vh] flex  gap-16 flex-wrap p-8"
      >
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          books.map((book) => (
            <Link
              href={`/detail/${book._id}`} // Use dynamic routing if necessary
              key={book._id}
              className="book w-48 h-52 bg-gray-200 rounded-xl overflow-hidden"
            >
              <div
                id="img"
                className="w-full h-[80%] bg-slate-700 overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={book.imageurl}
                  alt=""
                />
              </div>
              <h1 className="text-xl font-mono font-bold flex justify-evenly items-center text-center py-2 text-zinc-900">
                {book.title}
              {/* {usernames[book.user] || "Loading..."}  */}
              <img className="w-5 h-5 rounded-full z-50  bg-slate-900 "  src={usernames[book.user]} alt="dfsdfs" />
              </h1>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
