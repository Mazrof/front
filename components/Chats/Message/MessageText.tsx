"use client";
import { useMessageContext } from "@/provider/MessageProvider";
export function MessageText() {
    const message = useMessageContext();
    return <p className="container p-2">{message?.text}</p>;
}
