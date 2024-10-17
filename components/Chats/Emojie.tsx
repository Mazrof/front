"use client"
import React, { useState } from 'react'
import { SmileFaceIcon, SendMsIcon } from "@/utils/icons"
import { Theme } from 'emoji-picker-react';
import dynamic from 'next/dynamic'
const Picker = dynamic(
    () => {
        return import("emoji-picker-react")
    },
    { ssr: true }
)
function Emojie() {
    const [showEmojie, setShowEmoji] = useState<boolean>(false)
    function handleOnClick(e: any) {
        e.preventDefault()
        setShowEmoji((showEmojie) => !showEmojie)
    }
    return (
        <>
            {showEmojie && <div className='absolute bottom-14 left-[8%]'><Picker /></div>}
            <button className='absolute z-10 bottom-4 left-[10%] w-7 ' onClick={(e) => handleOnClick(e)} ><SmileFaceIcon /></button>
        </>
    )
}
export default Emojie
