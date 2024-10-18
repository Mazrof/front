"use client"
import { useShowFileOptions } from '@/store/inputMessage';
import { UploadImageIcon, UploadFileIcon } from '@/utils/icons'
import { useEffect, useRef } from 'react';
import React from 'react'
function UploadFilesOption() {
    const optionRef = useRef<HTMLDivElement | null>(null);
    const { isShow, setIsShow } = useShowFileOptions()
    const handleClickOutside = (event: MouseEvent) => {
        if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
            setIsShow(); // Close the picker when clicking outside
        }
    };
    useEffect(() => {
        if (isShow) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);
    return (
        <div className='flex flex-col dark:bg-gray-600 bg-gray-200 absolute bottom-16 right-[8%]  rounded-md w-48' ref={optionRef}>
            <div className="file-option-container">
                <label
                    htmlFor="photo-upload"
                    className="file-option-label">
                    <UploadImageIcon />
                    <p >Photo or Video</p>
                </label>
                <input id="photo-upload" type="file" className="hidden" accept="image/*,video/*" />
            </div>
            <div className="file-option-container">
                <label htmlFor="file-upload" className="file-option-label">
                    <UploadFileIcon />
                    <p>Document</p>
                </label>
                <input id="file-upload" type="file" className="hidden" />
            </div>
        </div>
    )
}

export default UploadFilesOption
