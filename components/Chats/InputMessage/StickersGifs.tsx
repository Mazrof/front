/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useStickersGifs } from "@/store/inputMessage";
import { useEffect } from "react";
import Image from "next/image";
import { Stickers ,Gifs} from "@/data";
import { StickerGif } from "@/types/inputMessage";
function StickersGifs({ option }: { option: string }) {
    const { stickers, gifs, setGifs, setStickers } = useStickersGifs();
    const fetchStickers = async () => {
        setStickers(Stickers as StickerGif[]);
    };
    const fetchGifs =  () => {
        setGifs(Gifs as StickerGif[]);
    };
    useEffect(() => {
        if (option === "Stickers" && stickers.length == 0) {
            fetchStickers();
        }
        if (option === "Gifs" && gifs.length == 0) {
            fetchGifs();
        }
    }, [option]);

    const data = option === "Stickers" ? stickers : gifs;
    return (
        <>
            {option !== "Emoji" && (
                <div className="grid h-[440px] w-full grid-cols-3 gap-2 overflow-y-auto p-2 justify-items-center items-center" data-testid={option} >
                    {data?.map((item) => (
                        <div key={item.id} className="h-[100px] w-[100px] justify-center items-center my-1">
                            <Image src={item.url} width={100} height={100} alt={option} data-testid={option + item.id} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default StickersGifs;
