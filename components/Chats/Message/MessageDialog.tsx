"use client";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";
import { Download, File } from "lucide-react";
export function MessageDialog() {
    const message = useMessageContext();
    return (
        message.documentUrl && (
            <div className="container flex justify-center p-2 align-middle">
                <File />
                <div>
                    <h3>{message?.name}</h3>
                    <p>{message?.size}</p>
                </div>
                <Download />
            </div>
        )
    );
}
