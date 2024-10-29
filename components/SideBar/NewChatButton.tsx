"use client";
import Image from "next/image";
import { useState } from "react";
export default function NewChatButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-md transition hover:bg-blue-600 focus:outline-none"
            >
                {isMenuOpen ? (
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
                <div className="absolute -top-36 right-0 z-10 w-48 rounded-lg bg-[#f3f3f3] py-2 text-slate-700 shadow-lg dark:bg-[#201f1f] dark:text-gray-100">
                    <ul>
                        <li className="mb-1 cursor-pointer rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                            New Channel
                        </li>
                        <li className="mb-1 cursor-pointer rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                            New Group
                        </li>
                        <li className="mb-1 cursor-pointer rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                            New Message
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
