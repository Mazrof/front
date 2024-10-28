import { SmileFaceIcon, StickersIcon, GifIcon } from "@/utils/icons"
import { checkClickOutside } from "@/utils/inputMessage";
import { useEffect, useRef, useState } from "react";
import Emoji from "./Emoji";
import StickersGif from "./StickersGifs";
function EmojiStickersGif() {
    const [isShowEmojiStickers, setIsShowEmojiStickers] = useState<boolean>(false)
    const [selectedOption, setselectedOption] = useState<string>("Emoji")
   
    const emojiRef = useRef<HTMLDivElement | null>(null);
    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsShowEmojiStickers(true);

    }
    const handleClickOutside = (event: MouseEvent) => {
        if (checkClickOutside(event, emojiRef.current)) {
            setselectedOption("Emoji")
            setIsShowEmojiStickers(false);
        }
    };
   
    const handleOnClickOption = (event: React.MouseEvent<HTMLButtonElement>,option:string) => {
        event.preventDefault()
        setselectedOption(option)
    
    }
    useEffect(() => {
        if (isShowEmojiStickers) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowEmojiStickers]);
    return (
        <>
            {isShowEmojiStickers && <div ref={emojiRef} className="absolute bottom-20 left-[11%] w-[355px] h-[480px] flex flex-col  items-center justify-between bg-white dark:bg-black" >
                <div className="w-full h-full ">
                    <Emoji option={selectedOption} />
                    <StickersGif option={selectedOption}/>
                </div>
                <div className="flex justify-evenly items-center  w-full mb-3 bg-white dark:bg-black  rounded-md ">
                    <button onClick={(event) => handleOnClickOption(event,"Emoji")}><SmileFaceIcon /></button> 
                    <button onClick={(event) => handleOnClickOption(event,"Stickers")}><StickersIcon  /></button>
                    <button onClick={(event) => handleOnClickOption(event,"Gifs")}><GifIcon /></button>
                </div>
            </div>}
            <button className="relative left-10 z-10 w-7 " onClick={(event) => handleOnClick(event)}>
                <SmileFaceIcon />
            </button>
        </>
    )
}

export default EmojiStickersGif
