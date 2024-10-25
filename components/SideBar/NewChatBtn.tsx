"use client";
import { useState } from 'react';
import Image from 'next/image';
export default function NewChatBtn() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12 shadow-md transition duration-200 hover:bg-blue-600 focus:outline-none"
      >
        {/* Conditionally render the icons based on isMenuOpen */}
        {isMenuOpen ? (
          // Close icon (X)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // // Pen icon
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   className="w-6 h-6"
          //   fill="none"
          //   viewBox="0 0 24 24"
          //   stroke="currentColor"
          // >
          //   <path
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     strokeWidth={2}
          //     d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
          //   />
          // </svg>
          <Image
            src="/images/pen.gif"
            alt="pen image"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </button>

      {/* Popup menu */}
      {isMenuOpen && (
        <div className="absolute -top-36 right-0  bg-[#201f1f] shadow-lg text-gray-100  rounded-lg py-2 w-48 z-10">
          <ul>
            <li className="px-4 py-2  cursor-pointer hover:bg-[#2B2B2B]">New Channel</li>
            <li className="px-4 py-2 hover:bg-[#2B2B2B] cursor-pointer">New Group</li>
            <li className="px-4 py-2 hover:bg-[#2B2B2B] cursor-pointer">New Message</li>
          </ul>
        </div>
      )}
    </div>
  );
}
