/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useStickersGifs } from "@/store/inputMessage";
import { useEffect } from "react";
import { StickerGif } from "@/types/inputMessage";
import { getStickers, getGifs } from "@/services/StickersGifs";
import Image from "next/image";
function StickersGifs({ option }: { option: string }) {
    const { stickers, gifs, setGifs, setStickers } = useStickersGifs();
    const fetchStickers = async () => {
        const stickersData: StickerGif[] = await getStickers();
        setStickers(stickersData);
    };
    const fetchGifs = async () => {
        const gifsData: StickerGif[] = await getGifs();
        setGifs(gifsData);
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
                <div className="grid h-[440px] w-full grid-cols-3 gap-2 overflow-y-auto p-2" data-testid={option} >
                    {data?.map((item) => (
                        <div key={item.id} className="h-[100px] w-[100px]">
                            <Image src={item.url} width={100} height={100} alt={option} data-testid={option + item.id} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default StickersGifs;
