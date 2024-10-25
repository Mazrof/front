"use client";
import { useMessageContext } from "@/provider/MessageProvider";
export function MessageVideo() {
    const message = useMessageContext();
    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {// eslint-disable-next-line @typescript-eslint/no-unused-vars
            message?.videoUrl?.map((video, index) => (
                //Todo: Add video component
                <></>
            ))}
        </div>
    );
}
