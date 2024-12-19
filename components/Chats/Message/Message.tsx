"use client";

import { MessageContext } from "@/provider/MessageProvider/MessageProvider";
import { MessageType } from "@/types/Message";
import { PropsWithChildren } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { MessageDialog } from "./MessageDialog";
type MessageProps = PropsWithChildren & {
    message: MessageType;
};

export function Message({ children, message }: MessageProps) {
    return (
        <MessageContext.Provider value={message}>
            <ContextMenu>
                <ContextMenuTrigger className="my-4 flex w-fit flex-col flex-wrap items-center justify-center rounded-lg bg-white dark:bg-[rgb(39,39,39)] dark:text-white">
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <MessageDialog />
                </ContextMenuContent>
            </ContextMenu>
        </MessageContext.Provider>
    );
}
