"use client";
{
    /** Edit
     * Please Remove Import React (it's unnecessary after react 18) and any unused Import inside the code
     */
}

import React, { useEffect, useState } from "react";
import Emoji from "@/components/Chats/Emoji";
import AttachFiles from "./AttachFiles";
import { useInputTextMessage } from "@/store/inputMessage";
import InputMessageButtons from "./InputMessageButtons";
import { AlertDialogDemo } from "./AlertDialogDemo";
function InputMessage({ placeHolder }: { placeHolder: string }) {
    const { textMessage, setTextMessage } = useInputTextMessage();
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        //Perfect You handled it Here ;)
        setTextMessage(e.target.value.trimStart());
    }
    return (
        <form className="absolute bottom-10 mx-auto mt-auto flex w-[95%] items-center justify-center">
            <div className="absolute mx-auto flex w-[90%] items-center justify-center">
                <Emoji />
                <div className="bottom-4 w-[85%]">
                    <input
                        type="text"
                        placeholder={placeHolder}
                        className="h-14 w-full rounded-xl bg-white px-14 py-3 text-xl outline-none placeholder:text-gray-500 dark:bg-black"
                        value={textMessage}
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <AttachFiles />
            </div>
            <InputMessageButtons />
        </form>
    );
}

export default InputMessage;
