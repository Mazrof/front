"use client";
import Image from "next/image";
import { useState } from "react";

export default function ChatsSearchBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <div>
            <header className="flex items-center justify-between bg-[#2C2F33] p-4 shadow-md">
                <div className="flex items-center">
                    <Image
                        src="/images/logo.gif"
                        alt="App Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <h1 className="ml-2 text-xl font-semibold text-white">Mazrof</h1>
                </div>

                <div className="relative mx-4 flex-grow">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded-full bg-[#3E4146] px-4 py-2 text-white focus:outline-none"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={toggleMenu}
                        className="text-white transition duration-200 hover:text-blue-500"
                    >
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
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="absolute right-0 top-20 z-10 w-48 rounded-lg bg-[#201f1f] py-2 text-gray-100 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                        <ul>
                            <li className="flex cursor-pointer gap-2 px-4 py-2 hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/settings.gif"
                                    alt="settings icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                Settings
                            </li>
                            <li className="flex cursor-pointer gap-2 px-4 py-2 hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/save.gif"
                                    alt="save icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                Saved Messages
                            </li>
                            <li className="flex cursor-pointer gap-2 px-4 py-2 hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/telegram-stories.gif"
                                    alt="telegram-stories icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                My Stories
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
}
