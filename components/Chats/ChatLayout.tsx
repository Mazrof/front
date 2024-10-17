import React from 'react'
import InputMessage from "@/components/Chats/InputMessage"
function ChatLayout() {
    return (
        <div className='dark:bg-dark bg-light hidden md:block w-full min-h-screen overflow-y-auto relative'>
            Chatting
            <InputMessage placeHolder='Message'/>
        </div>
    )
}

export default ChatLayout
