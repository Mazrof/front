// "use client";
// import { createContext, PropsWithChildren, useContext } from "react";
// import Image from "next/image";
// type MessageType = {
//     text: string | undefined;
//     imageUrl: string[] | undefined;
//     createdAt: string | undefined;
//     videoUrl: string[] | undefined;
// };

// const MessageContext = createContext<MessageType | undefined>(undefined);

// function useMessageContext() {
//     const context = useContext(MessageContext);
//     if (!context) {
//         throw new Error("useMessageContext must be used within a MessageProvider");
//     }
//     return context;
// }
// type MessageProps = PropsWithChildren & {
//     message: MessageType;
// };
// export default function Message({ children, message }: MessageProps) {
//     return <MessageContext.Provider value={message}>{children}</MessageContext.Provider>;
// }

// Message.Text = function MessageText() {
//     const message = useMessageContext();
//     return <p>{message?.text}</p>;
// };

// Message.Image = function MessageImage() {
//     const message = useMessageContext();
//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                 {message?.imageUrl?.map((photo, index) => (
//                     <div key={index} className="relative">
//                         <Image
//                             src={photo}
//                             layout="responsive"
//                             alt={`Photo ${index + 1}`}
//                             className="h-auto w-full rounded-lg object-cover"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// Message.Video = function MessageVideo() {
//     const message = useMessageContext();
//     return (
//         <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             {message?.videoUrl?.map((video, index) => (
//                 <div
//                     key={index}
//                     className="relative overflow-hidden rounded-md bg-gray-800 pb-56 shadow-lg"
//                 >
//                     <iframe
//                         className="absolute left-0 top-0 h-full w-full"
//                         src={video}
//                         title={video}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                     ></iframe>
//                 </div>
//             ))}
//         </div>
//     );
// };
// Message.createdAt = function MessageCreatedAt() {
//     const message = useMessageContext();
//     return <p>{message?.createdAt}</p>;
// };

"use client";

import Image from "next/image";
import { createContext, PropsWithChildren, useContext } from "react";

type MessageType = {
    text: string | undefined;
    imageUrl: string[] | undefined;
    createdAt: string | undefined;
    videoUrl: string[] | undefined;
};

const MessageContext = createContext<MessageType | undefined>(undefined);

function useMessageContext() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within a MessageProvider");
    }
    return context;
}

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

export function MessageText() {
    const message = useMessageContext();
    return <p className="container max-w-[500px] p-2">{message?.text}</p>;
}

export function MessageImage() {
    const message = useMessageContext();
    return (
        <div className="container mx-auto max-w-[500px]">
            <div className="flex flex-wrap justify-center">
                {message?.imageUrl?.map((photo, index) => (
                    <div key={index} className="relative">
                        <Image
                            src={photo}
                            width={500}
                            height={500}
                            alt={`Photo ${index + 1}`}
                            className="h-auto w-full rounded-lg rounded-b-none object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

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

export function MessageCreatedAt() {
    const message = useMessageContext();
    return <p className="w-full px-2 text-end">{message?.createdAt}</p>;
}
