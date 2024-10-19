"use client";
import React, { useEffect, useState, useRef } from "react";
import { SmileFaceIcon } from "@/utils/icons";
import { useInputTextMessage } from "@/store/inputMessage";
import { checkClickOutside } from "@/utils/inputMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
function Emoji() {
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const { setEmoji } = useInputTextMessage();
    const emojiRef = useRef<HTMLDivElement | null>(null);
    function handleOnClick(e: any) {
        /** Edit
         * function handleOnClick(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */
        e.preventDefault();
        setShowEmoji((showEmojie) => !showEmojie);
    }
    const onEmojiClick = (emojiObject: any) => {
        /** Edit
         * function OnEmojiClick(event:React.MouseEvent<HTMLButtonElement>) because any is bad indication for typescript ;)
         * and Replace every e in the file
         */
        setEmoji(emojiObject.native);
    };
    const handleClickOutside = (event: MouseEvent) => {
        // Perfect I want all to be like that
        if (checkClickOutside(event, emojiRef.current)) {
            setShowEmoji(false); // Close the picker when clicking outside
        }
    };
    useEffect(() => {
        if (showEmoji) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmoji]);
    return (
        <>
            {showEmoji && (
                <div className="absolute bottom-20 left-[8%] bg-white" ref={emojiRef}>
                    <Picker data={data} onEmojiSelect={onEmojiClick} theme="light" />
                </div>
            )}
            <button
                className="absolute bottom-[.9rem] left-[10%] z-10 w-7"
                onClick={(e) => handleOnClick(e)}
            >
                <SmileFaceIcon />
            </button>
        </>
    );
}

export default Emoji;
