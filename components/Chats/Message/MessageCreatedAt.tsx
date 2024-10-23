"use client";
import { useMessageContext } from "@/provider/MessageProvider";
export function MessageCreatedAt() {
    const message = useMessageContext();
    return <p className="w-full px-2 text-end">{message?.createdAt}</p>;
}
