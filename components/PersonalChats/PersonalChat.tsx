"use client";
import { UploadingAlert } from "../Chats/InputMessage/UploadingAlert";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
import InfoChatBar from "../Chats/InfoChatBar";
import { MessageTypeBE } from "@/types/Message";
import { getMessages } from "@/services/Messages";
import { useEffect } from "react";
import ChatLayout from "../Chats/ChatLayout";
import { useIsFirstTimeChat, useMessagesStore, useSelectedChatRoom } from "@/store/user";
import { failResponse, genericResponse, successResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { getSocket } from "@/lib/socket";
import { Socket } from "socket.io-client";
function PersonalChat() {
    const router = useRouter();
    const { selectedChatRoom } = useSelectedChatRoom();
    const { setIsFirstTime } = useIsFirstTimeChat();
    const {  setMessages, checkExistChat, chatMessages, setMessage } =
        useMessagesStore();
    console.log(chatMessages);
    const FirstFetchMessage = async (page: number) => {
        if (!selectedChatRoom) return; // Early exit if no selectedChatRoom
        const response: genericResponse<MessageTypeBE[]> = await getMessages({
            id: selectedChatRoom.id,
            page,
            limit: 100,
        });
        console.log("Raw API Response:", response);
        if (response.status === "fail" || response.status === "error") {
            const failApiResponse = response as failResponse;
            if (failApiResponse?.error?.statusCode === 403) {
                setIsFirstTime(true);
            } else if (failApiResponse?.error?.statusCode === 401) {
                router.push("/login");
            }
        } else {

            setIsFirstTime(false);
            const data: MessageTypeBE[] = (response as unknown as MessageTypeBE[]);
            console.log("retuened data",data)
            if (selectedChatRoom) {
                setMessages({
                    ...selectedChatRoom,
                    messages: data,
                });
            }
        }
    };

    useEffect(() => {
        // Ensure selectedChatRoom is available before making any API calls
        if (
            selectedChatRoom &&
            selectedChatRoom?.type === "personalChat" &&
            !checkExistChat(selectedChatRoom.id)
        ) {
            console.log("first enter");
            FirstFetchMessage(1);
        }
        const socket: Socket = getSocket() as Socket;
        socket?.on("message:receive", (data: MessageTypeBE) => {
            if (!checkExistChat(data.participantId as number)) {
                if (selectedChatRoom)
                    setMessages({
                        ...selectedChatRoom,
                        messages: [data],
                    });
            } else setMessage(data, data.participantId as number);
        });
    }, [selectedChatRoom]);

    // Ensure selectedChatRoom is defined before rendering
    if (!selectedChatRoom) return <div>Loading...</div>;

    return (
        <div>
            <InfoChatBar name={"Ahmed Mostafa"} lastSeen={"10:00"}>
                {InfoChatBar.PersonalDrop}
            </InfoChatBar>
            <UploadingAlert />
            <ChatLayout />
            <InputMessage placeHolder="Message" />
        </div>
    );
}

export default PersonalChat;
