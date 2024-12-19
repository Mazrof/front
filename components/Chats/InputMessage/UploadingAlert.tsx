/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CloseIcon } from "@/utils/icons";
import { useEffect } from "react";
import {
    useOpenAlert,
    useFileInfo,
    useFileInput,
    useInputTextMessage,
    useIsMaxSizeError,
} from "@/store/inputMessage";
import { capitalizeFirstLetter } from "@/utils/inputMessage";
import ShowUploadedFiles from "@/components/Chats/InputMessage/ShowUploadedFiles";
import { getFileType } from "@/utils/inputMessage";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getSocket } from "@/lib/socket";
import React from "react";
import { useSettings } from "@/store/settings";
import { Socket } from "socket.io-client";
import { MessageTypeBE } from "@/types/Message";
import { useMessagesStore, useSelectedChatRoom, useWhoAmI } from "@/store/user";
export function UploadingAlert() {
    const { isOpenAlert, setIsOpenAlert } = useOpenAlert();
    const { fileType, setFileType, setUrl, url } = useFileInfo();
    const { caption, setCaption, setUploadedFile, uploadedFile } = useFileInput();
    const { textMessage, setTextMessage } = useInputTextMessage();
    const { setIsMaxSize, isMaxSize } = useIsMaxSizeError();
    const { settings } = useSettings();
    const { user } = useWhoAmI();
    const { selectedChatRoom } = useSelectedChatRoom();
    const { setMessage } = useMessagesStore();
    const type = getFileType(fileType);
    function handleChangeCaption(event: React.ChangeEvent<HTMLInputElement>) {
        setCaption(event.target.value);
    }
    function unSetVariables() {
        setUrl("");
        setFileType("");
        setUploadedFile(null);
        setIsOpenAlert(false);
        setIsMaxSize(false);
        setCaption("")
        setTextMessage("");
    }
    function sendFile() {
        const socket: Socket = getSocket() as Socket;
        const message: MessageTypeBE = {
            content: JSON.stringify({
                imageUrl: fileType == "image" ? [url] : undefined,
                videoUrl: fileType == "video" ? [url] : undefined,
                documentUrl: fileType == "file" ? [url] : undefined,
                size: uploadedFile?.size,
                name: uploadedFile?.name,
                text: caption,
                type: "message",
            }),
            participantId: selectedChatRoom?.id as number, // id of the place where the message is going to be sent or null if you will provide receiverId for new personal chats
            status: undefined, // or null or drafted
            durationInMinutes: undefined, // can be null self destored
            isAnnouncement: false, // for group announcement
            isForward: false,
            participantType: undefined, // or group or personalChat when mention
            channelOrGroupId: undefined,
            replyTo: undefined, // or null (the message id to which this message is a reply)
            receiverId: 11,
            inputMessageMentions: undefined,
            senderId: user?.user.id,
        };
        console.log(message);
        // untill return
        setMessage(
            { ...message, id: -1 },
            selectedChatRoom?.id as number,
            user?.user?.id as number
        );
        socket?.emit("message:sent", message);
       
        unSetVariables();
    }
    useEffect(() => {
        setCaption(textMessage);
    }, [textMessage]);
    return (
        <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-14 text-center align-middle text-2xl">
                        <AlertDialogCancel
                            onClick={unSetVariables}
                            className={`${!isMaxSize && type === "" ? "hidden" : ""}`}
                        >
                            <CloseIcon />
                        </AlertDialogCancel>
                        Send {capitalizeFirstLetter(type)}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-xl">
                        {isMaxSize
                            ? `This File is exceeding the maximum size ${settings?.maxLimitFileSize}`
                            : ""}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className={`max-h-96 w-full overflow-hidden ${isMaxSize ? "hidden" : ""}`}>
                    <ShowUploadedFiles />
                </div>
                <AlertDialogFooter className={`${isMaxSize ? "hidden" : ""}`}>
                    <input
                        type="text"
                        className={`w-full bg-white outline-none dark:bg-black ${type === "" ? "hidden" : ""}`}
                        placeholder="Add a caption..."
                        value={caption}
                        onChange={(event) => handleChangeCaption(event)}
                    />
                    <AlertDialogAction
                        className={`bg-blue-700 hover:bg-blue-500 dark:bg-purple-700 dark:hover:bg-purple-500 ${type === "" ? "hidden" : ""}`}
                        onClick={sendFile}
                    >
                        SEND
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
