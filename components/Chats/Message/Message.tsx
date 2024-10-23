"use client";

import { MessageContext } from "@/provider/MessageProvider";
import { MessageType } from "@/types/Message";
import { PropsWithChildren } from "react";

type MessageProps = PropsWithChildren & {
    message: MessageType;
};

export function Message({ children, message }: MessageProps) {
    return (
        <MessageContext.Provider value={message}>
            <div className="my-4 flex w-fit flex-col flex-wrap items-center justify-center rounded-lg bg-white">
                {children}
            </div>
        </MessageContext.Provider>
    );
}
