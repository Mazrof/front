"use client";
import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useSelectedChatRoom } from "@/store/user";
import PersonalChat from "../PersonalChats/PersonalChat";
import { DefaultEventsMap } from "@socket.io/component-emitter";

function ChatRoom() {
    const { isSelectedChatRoom, selectedChatRoom } = useSelectedChatRoom();
    const isSelectedChat = isSelectedChatRoom();

    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        if (isSelectedChat && socketRef.current === null) {
            socketRef.current = io(`${process.env.NEXT_SERVER_IP}`, {
                withCredentials:true
            });
        }
            socketRef.current?.on("connect", () => {
                console.log("Socket connected");
            });

            socketRef.current?.on("disconnect", () => {
                console.log("Socket disconnected");
            });
        

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [isSelectedChat]);

    return (
        <div
            className={`bg-light dark:bg-dark relative ${
                !isSelectedChat && "hidden"
            } min-h-screen flex-1 overflow-hidden md:block`}
        >
            {isSelectedChat && (
                <>
                    {selectedChatRoom?.type === "personalChat" && <PersonalChat />}
                    {/* TODO: Add other types like group and channel */}
                </>
            )}
        </div>
    );
}

export default ChatRoom;
