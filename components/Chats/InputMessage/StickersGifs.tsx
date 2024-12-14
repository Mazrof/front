/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useStickersGifs } from "@/store/inputMessage";
import { useEffect } from "react";
import Image from "next/image";
import { Stickers, Gifs } from "@/data";
import { StickerGif } from "@/types/inputMessage";
import { convertToBase64 } from "@/utils/inputMessage";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import { MessageTypeBE } from "@/types/Message";
import { useMessagesStore, useSelectedChatRoom, useWhoAmI  
 } from "@/store/user";

function StickersGifs({ option }: { option: string }) {
    const { selectedChatRoom } = useSelectedChatRoom();
    const { setMessage } = useMessagesStore();
    const { user } = useWhoAmI()

    const handleImage = async (path: string) => {
        const response = await fetch(path);
        const blob = await response.blob();
        const file = new File([blob], "url", { type: blob.type });
        convertToBase64(file, async (base64, error) => {
            if (error) {
                console.log(error);
            } else {
                console.log(base64)
                 onSendStickers(base64 as string);
            }
        });
    };
    function onSendStickers(url: string) {
        const socket: Socket = getSocket() as Socket;
        const message: MessageTypeBE = {
            content: JSON.stringify({ imageUrl:[ url] ,type:"message"}),
            participantId: selectedChatRoom?.id as number, // id of the place where the message is going to be sent or null if you will provide receiverId for new personal chats
            status: undefined, // or null or drafted
            durationInMinutes: undefined, // can be null self destored
            isAnnouncement: false, // for group announcement
            isForward: false,
            participantType: undefined, // or group or personalChat when mention
            channelOrGroupId: undefined,
            replyTo:
                (selectedChatRoom?.id as number) !==31
                    ? selectedChatRoom?.secondUser?.id
                    : undefined, // or null (the message id to which this message is a reply)
            receiverId: undefined,
            inputMessageMentions: undefined,
        };
        console.log(message)
        // untill return
        setMessage({ ...message, id: -1 }, selectedChatRoom?.id as number, user?.user?.id as number)
        socket?.emit("message:sent", message);
    }
    const { stickers, gifs, setGifs, setStickers } = useStickersGifs();
    const fetchStickers = async () => {
        setStickers(Stickers as StickerGif[]);
    };
    const fetchGifs = () => {
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
                <div
                    className="grid h-[440px] w-full grid-cols-3 items-center justify-items-center gap-2 overflow-y-auto p-2"
                    data-testid={option}
                >
                    {data?.map((item) => (
                        <div
                            key={item.id}
                            className="my-1 h-[100px] w-[100px] items-center justify-center"
                        >
                            <Image
                                src={item.url}
                                width={100}
                                height={100}
                                alt={option}
                                data-testid={option + item.id}
                                onClick={() => handleImage(item.url)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default StickersGifs;
