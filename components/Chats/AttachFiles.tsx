"use client";
import React, { useState } from "react";
{
    /** Edit
     * Please Remove Import React (it's unnecessary after react 18) and any unused Import inside the code
     * please kindly edit the prettier configurations to format on save
     * or Unforunately you'll need to format each file manually by right click and choose format document
     */
}
import { AttachFileIcon } from "@/utils/icons";
import UploadFilesOption from "./UploadFileOptions";
import { useShowFileOptions } from "@/store/inputMessage";
function AttachFiles() {
    const { isShow, setIsShow } = useShowFileOptions();
    function handleOnClick(e: any) {
        /** Edit
         * function handleOnClick(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */

        e.preventDefault();
        setIsShow();
    }
    return (
        <>
            {isShow && <UploadFilesOption />}
            <button
                className="absolute bottom-[.9rem] right-[10%] z-10 w-7"
                onClick={(e) => handleOnClick(e)}
            >
                <AttachFileIcon />
            </button>
        </>
    );
}

export default AttachFiles;
