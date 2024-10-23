"use client";
import { useMessageContext } from "@/provider/MessageProvider";
export function MessageVideo() {
    const message = useMessageContext();
    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {message?.videoUrl?.map((video, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-md bg-gray-800 pb-56 shadow-lg"
                >
                    <iframe
                        className="absolute left-0 top-0 h-full w-full"
                        src={video}
                        title={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
}
