"use client"
import React, { useState } from 'react'
import { SmileFaceIcon } from "@/utils/icons"
import { useInputTextMessage } from '@/store/inputMessage'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function Emoji() {
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const { setEmoji } = useInputTextMessage()
    function handleOnClick(e: any) {
        e.preventDefault()
        setShowEmoji((showEmojie) => !showEmojie)
    }
    const onEmojiClick = (emojiObject: any) => {
        setEmoji(emojiObject.native)
    }
    return (
        <>
            {showEmoji && <div className='absolute bottom-20 left-[8%] bg-white '><Picker data={data} onEmojiSelect={onEmojiClick} theme="light" /></div>}
                <button className='absolute z-10 bottom-[.9rem] left-[10%] w-7 ' onClick={(e) => handleOnClick(e)} ><SmileFaceIcon /></button>
        </>
    )
}

export default Emoji