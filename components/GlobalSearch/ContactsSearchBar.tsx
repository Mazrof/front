/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ShowGlobalSearch,SetShowGlobalSearch } from "@/types/SideBar";
import Image from "next/image";
export default function ContactsSearchBar({ShowGlobalSearch,setShowGlobalSearch}:{ ShowGlobalSearch:ShowGlobalSearch, setShowGlobalSearch:SetShowGlobalSearch }) {
    function toggleGlobalSearch() {
        setShowGlobalSearch((ShowGlobalSearch)=>!ShowGlobalSearch);
    }
    return (
            <header className="flex items-center justify-between bg-[#fcfcfc] p-4 shadow-md dark:bg-[#2C2F33]">
                <div className="relative mx-4 flex flex-row space-x-6">
                    <button onClick={toggleGlobalSearch} >
                        <Image
                            src="/images/left-arrow.gif"
                            width={50}
                            height={50}
                            alt="back arrow"
                            className="rounded-full"
                        ></Image>
                    </button>
                    <input
                        type="text"
                        placeholder="Search Contacts"
                        className="w-full rounded-full bg-[#f3f2f2] px-4 py-2 text-black focus:outline-none dark:bg-[#3E4146] dark:text-white"
                    />
                </div>
            </header>
        
    );
}
