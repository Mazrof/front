"use client";
import { useStickersGifs } from "@/store/inputMessage";
import { useEffect } from "react";
import { StickerGif } from "@/types/inputMessage";
import Image from "next/image";
function StickersGifs({ option }: { option: string }) {
    const { stickers, gifs, setGifs, setStickers } = useStickersGifs();
    const fetchStickers = async () => {
        const stickersResponse = await fetch("http://localhost:4000/stickers");
        const stickersData: StickerGif[] = await stickersResponse.json();
        setStickers(stickersData);
    };
    const fetchGifs = async () => {
        const gifsResponse = await fetch("http://localhost:4000/gifs");
        const gifsData: StickerGif[] = await gifsResponse.json();
        setGifs(gifsData);
    };
    useEffect(() => {
        if (option === "Stickers" && stickers.length == 0) {
            console.log("stickers");
            fetchStickers();
        }
        if (option === "Gifs" && gifs.length == 0) {
            console.log("gifs");
            fetchGifs();
        }
    }, [option]);
    const data = option === "Stickers" ? stickers : gifs;
    return (
        <>
            {option !== "Emoji" && (
                <div className="grid h-[440px] w-full grid-cols-3 overflow-y-auto p-2">
                    {data?.map((item) => (
                        <div key={item.id} className="h-[100px] w-[100px]">
                            <Image src={item.url} width={100} height={100} alt={option} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default StickersGifs;
