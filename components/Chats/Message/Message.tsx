"use client";

import Image from "next/image";
iimport { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Importing ShadCN UI components
import { useState } from "react";


type MessageProps = PropsWithChildren & {
    message: MessageType;
};

export function Message({ children, message }: MessageProps) {
    return (
        <MessageContext.Provider value={message}>
            <div className="mx-auto my-4 flex w-fit flex-col flex-wrap rounded-lg bg-white">
                {children}
            </div>
        </MessageContext.Provider>
    );
}

