import Link from 'next/link';
import React from 'react';

function Page() {
  // Array of book data
  const books = [
    { id: 1, title: 'Book Title 1' },
    { id: 2, title: 'Book Title 2' },
    { id: 3, title: 'Book Title 3' },
    { id: 4, title: 'Book Title 4' },
    { id: 5, title: 'Book Title 5' }, 
  ];

  return (
    <div className="w-full h-screen">
      {/* Navigation */}
   

      {/* Book Container */}
      <div id="container" className="max-w-screen-lg m-auto h-[90vh] pt-[12vh] flex gap-16 flex-wrap p-8">
        {books.map((book) => (
          <Link href={'/detail'}
            key={book.id}
            className="book w-48 h-52 bg-gray-200 rounded-xl overflow-hidden"
          >
            <div
              id="img"
              className="w-full h-[80%] bg-slate-700 overflow-hidden"
            ></div>
            <h1 className="text-xl  leading-tight tracking-tight font-mono font-bold text-center py-2 text-black">
              {book.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Page;
