"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ChatsSearchBar({ setDarkMode, showContacts, setShowContacts }) {
    const [darkMode, setDarkModeState] = useState(() => {
        if (typeof window !== "undefined") {
            const storedMode = localStorage.getItem("darkMode");
            return storedMode ? JSON.parse(storedMode) : false;
        }
        return false;
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMode() {
        setDarkModeState((prevMode) => !prevMode);
    }

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        setDarkMode(darkMode); // Update parent `darkMode` if necessary
    }, [darkMode, setDarkMode]); // Dependency on `darkMode` and `setDarkMode`

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function toggleContacts() {
        setShowContacts((showContactsValue) => !showContactsValue);
    }

    return (
        <div>
            <header className="flex items-center justify-between bg-[#fcfcfc] p-4 shadow-md dark:bg-[#2C2F33]">
                <div className="mr-2 flex items-center">
                    <Image
                        src="/images/logo.gif"
                        alt="App Logo"
                        width={40}
                        height={40}
                        className="w-5 rounded-full md:w-10"
                    />
                    <h1 className="text-md ml-2 font-semibold text-slate-800 dark:text-white md:text-xl">
                        Mazrof
                    </h1>
                </div>

                <div className="relative mx-4 flex-grow">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded-full bg-[#f3f2f2] px-4 py-2 text-black focus:outline-none dark:bg-[#3E4146] dark:text-white"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-400 hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
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
                    <div className="absolute right-0 top-20 z-10 w-48 rounded-lg bg-[#f3f3f3] py-2 text-slate-700 opacity-0 shadow-lg group-hover:opacity-100 dark:bg-[#201f1f] dark:text-gray-100">
                        <ul>
                            <li className="flex cursor-pointer gap-2 rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/settings.gif"
                                    alt="settings icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                Settings
                            </li>
                            <li className="flex cursor-pointer gap-2 rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/save.gif"
                                    alt="save icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                Saved Messages
                            </li>
                            <li className="flex cursor-pointer gap-2 rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]">
                                <Image
                                    src="/images/telegram-stories.gif"
                                    alt="telegram-stories icon"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                My Stories
                            </li>
                            <li
                                onClick={toggleMode}
                                className="flex cursor-pointer gap-2 rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]"
                            >
                                <span>{darkMode ? "🌑" : "☀️"}</span>
                                <span>{darkMode ? "Night" : "Light"}</span>
                            </li>
                            <li
                                onClick={toggleContacts}
                                className="flex cursor-pointer gap-2 rounded-xl px-4 py-2 hover:bg-[#eaeaea] dark:bg-[#201f1f] dark:hover:bg-[#2B2B2B]"
                            >
                                <span>📞</span>
                                Contacts
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
}
