"use client"
//import ForwardDialog from "./components/ForwardDialog";
//import {useState,createContext} from "react";
//import SelectBox from "./components/SelectBox";
import React, { Suspense,useState } from 'react';
import ChatLayout from '@/components/Chats/ChatLayout';
import ChatRoom from '@/components/Chats/ChatRoom';
import MessageLoading from '@/components/Chats/Message/MessageLoading';
import InputMessage from '@/components/Chats/InputMessage/InputMessage';
import CommentBar from '@/components/Chats/CommentBar';

export default function Home() {
  
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`container mx-auto min-w-screen flex max-h-screen max-w-full ${darkMode && "dark"} relative min-h-screen flex-1 overflow-hidden`} id='comment-page'>

        <div className='bg-light dark:bg-black flex flex-col items-center'>
            <CommentBar/>
            <div id="comment-input">
                <InputMessage placeHolder="Comment" />
            </div>
            
        </div>

    </div>
  );
}
//<ChatLayout />
//<Suspense
//fallback={

//}
//>

//</Suspense>
