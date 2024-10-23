"use client";
import { CloseIcon } from "@/utils/icons";
import { useEffect } from "react";
import { useOpenAlert, useFileInfo, useFileInput, useInputTextMessage } from "@/store/inputMessage";
import { capitalizeFirstLetter } from "@/utils/inputMessage";
import ShowUploaded from "@/components/Chats/ShowUploaded";
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
import React from "react";
export function UploadingAlert() {
    const { isOpenAlert, setIsOpenAlert } = useOpenAlert();
    const { fileType, setFileType, setUrl } = useFileInfo();
    const { caption, setCaption, setUploadedFile } = useFileInput();
    const { textMessage } = useInputTextMessage();
    const type = getFileType(fileType);
    function handleChangeCaption(event: React.ChangeEvent<HTMLInputElement>) {
        setCaption(event.target.value);
    }
    function unSetVariables() {
        setUrl("");
        setFileType("");
        setUploadedFile(null);
        setIsOpenAlert(false);
    }
    function sendImageVideo() {
        //ToDO BackEnd
        unSetVariables();
    }
    useEffect(() => {
        setCaption(textMessage);
    }, [fileType]);
    return (
        <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex gap-14 text-center align-middle text-2xl">
                        <AlertDialogCancel onClick={unSetVariables}>
                            <CloseIcon />
                        </AlertDialogCancel>
                        Send {capitalizeFirstLetter(type)}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="max-h-96 w-full overflow-hidden">
                        <ShowUploaded />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <input
                        type="text"
                        className="w-full bg-white outline-none dark:bg-black"
                        placeholder="Add a caption..."
                        value={caption}
                        onChange={(event) => handleChangeCaption(event)}
                    />
                    <AlertDialogAction
                        className="bg-blue-700 hover:bg-blue-500 dark:bg-purple-700 dark:hover:bg-purple-500"
                        onClick={sendImageVideo}
                    >
                        Send
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
