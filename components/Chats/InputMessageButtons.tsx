"use client"
import React from 'react'
import { SendMsIcon, VoiceIcon, DeleteIcon } from '@/utils/icons'
import { useInputTextMessage, useIsRecording } from '@/store/inputMessage'
function InputMessageButtons() {
    const { textMessage } = useInputTextMessage()
    const { isRecording, setIsRecoding } = useIsRecording()
    function handleOnClickVoice(e: any) {
        e.preventDefault()
        setIsRecoding(true)
    }
    function handleDeleteRecording(e: any) {
        e.preventDefault()
        setIsRecoding(false)
    }
    function handleSendRecording(e: any) {
        e.preventDefault()
        setIsRecoding(false)
    }
    return (
        <>
            {textMessage !== "" ?
                <button type='submit' className='input-message-button'> <SendMsIcon /></button> :
                <button className={`input-message-button ${isRecording ? "hidden" : ""} `} onClick={(e) => handleOnClickVoice(e)}><VoiceIcon /></button>
            }
            {
                isRecording && (<>
                    <button className='input-message-button bg-red-500 mx-20 ' onClick={(e)=>handleDeleteRecording(e)}> <DeleteIcon /></button>
                    <button className='input-message-button ml-3 ' onClick={(e) => handleSendRecording(e)}> <SendMsIcon /></button>
                </>
                )
            }
        </>
    )
}
export default InputMessageButtons
