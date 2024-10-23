import { createContext, useContext } from "react";

import { MessageType } from "@/types/Message";
export const MessageContext = createContext<MessageType | undefined>(undefined);

export function useMessageContext() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
}
