"use client";
import { useState } from "react";
import Image from "next/image";
export default function NewChatButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition duration-200 hover:bg-blue-600 focus:outline-none"
            >
                {/* Conditionally render the icons based on isMenuOpen */}
                {isMenuOpen ? (
                    // Close icon (X)
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                <div className="absolute -top-36 right-0 z-10 w-48 rounded-lg bg-[#201f1f] py-2 text-gray-100 shadow-lg">
                    <ul>
                        <li className="cursor-pointer px-4 py-2 hover:bg-[#2B2B2B]">New Channel</li>
                        <li className="cursor-pointer px-4 py-2 hover:bg-[#2B2B2B]">New Group</li>
                        <li className="cursor-pointer px-4 py-2 hover:bg-[#2B2B2B]">New Message</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
