"use client";
import { useInputTextMessage } from "@/store/inputMessage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
function Emoji({ option }: { option:string}) {
    const { setEmoji } = useInputTextMessage();
   
    const onEmojiClick = (emojiObject: { native: string }) => {
        setEmoji(emojiObject.native);
    };
   
    return (
        <>
            {option==="Emoji" && (
                <div className="w-full mt-2 " >
                    <Picker data={data} onEmojiSelect={onEmojiClick}   />
                </div>
            )}
         
        </>
    );
}

export default Emoji;
