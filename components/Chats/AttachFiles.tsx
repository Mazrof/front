"use client"
import React, { useState } from 'react'
import { AttachFileIcon } from '@/utils/icons'
import UploadFilesOption from './UploadFileOptions'
import { useShowFileOptions } from "@/store/inputMessage"
function AttachFiles() {
    const { isShow,setIsShow } = useShowFileOptions()
    function handleOnClick(e: any) {
        e.preventDefault()
        setIsShow()
    }
    return (
        <>
            {isShow&&<UploadFilesOption />}
            <button className='absolute z-10 bottom-[.9rem] right-[10%] w-7 ' onClick={(e) => handleOnClick(e)}>
                <AttachFileIcon />
            </button>
        </>
    )
}

export default AttachFiles
