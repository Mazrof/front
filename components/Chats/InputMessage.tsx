"use client"
import React, { useEffect, useState } from 'react'
import Emoji from "@/components/Chats/Emoji"
import AttachFiles from './AttachFiles'
import { useInputTextMessage } from '@/store/inputMessage'
import { SendMsIcon, VoiceIcon } from '@/utils/icons'
function InputMessage({ placeHolder }: { placeHolder: string }) {
    const { textMessage, setTextMessage } = useInputTextMessage()
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTextMessage(e.target.value.trimStart())
    }
    return (
        <form className='absolute mt-auto flex justify-cnter items-center w-[95%] mx-auto bottom-10' >
            <div className='w-[95%] flex justify-center items-center mx-auto absolute'>
                <Emoji/>
                <div className=' w-[85%]  bottom-4'>
                    <input type='text' placeholder={placeHolder} className='dark:bg-black w-full bg-white h-14 py-3 px-14 rounded-xl outline-none text-xl placeholder:text-gray-500 ' value={textMessage} onChange={(e) => handleOnChange(e)} />
                </div>
                <AttachFiles />
            </div>
            {textMessage !== "" ?
                <button type='submit' className='input-message-button'> <SendMsIcon /></button> :
                <button className=' input-message-button'><VoiceIcon /></button>
            }

        </form>
    )
}

export default InputMessage
