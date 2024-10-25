"use client";
import { useMessageContext } from "@/provider/MessageProvider";
export function MessageCreatedAt() {
    const { createdAt } = useMessageContext();
    return (
        <p className="w-full px-2 text-end">
            {new Date(createdAt as string).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            })}
        </p>
    );
}
