import { ChatRoom } from "./user";
//content
export type MessageType = {
    text?: string | undefined;
    imageUrl?: string[] | undefined;
    createdAt?: string | undefined;
    videoUrl?: string[] | undefined;
    size?: string;
    documentObject?: {
        name?: string;
        documentUrl?: string | undefined;
        size?: string;
    };
    audioUrl?: string | undefined;
    type: "message" | "announcement";
    name?:string
};
export type ReadReceipt = {
    userId: number;
    messageId: number;
    deliveredAt: string;
    readAt?: string | null;
};
// actuall message type from data base
export type MessageTypeBE = {
    id?: number;
    createdAt?: string;
    inputMessageMentions?: undefined | null | number[];
    isAnnouncement?: boolean;
    isForward?: boolean;
    updatedAt?: string;
    content: null | string;
    url?: null | string;
    senderId?: number;
    receiverId?: number;
    replyTo?: number | null;
    participantId: number | null;
    status?: "pinned" | "drafted" | undefined;
    channelOrGroupId?: number | undefined;
    durationInMinutes?: null | number | undefined;
    readReceipt?: ReadReceipt[];
    participantType?: "channel" | "group" | undefined; // or group or personalChat
};
export type MessagesStoreType = ChatRoom & {
    messages: MessageTypeBE[];
};
export type useMessagesStoreType = {
    chatMessages: MessagesStoreType[];
    setMessages: (newChatMessages: MessagesStoreType) => void;
    setMessage: (newMessage: MessageTypeBE, participantId: number, userId: number) => void;
    updateMessage: (message: MessageTypeBE, participantId: number) => void;
    removeMessage: (message: MessageTypeBE, participantId: number) => void;
    getChatMessage: (participantId: number) => MessageTypeBE[];
    checkExistChat: (participantId: number) => boolean;
    getChat:(participantId:number)=>ChatRoom
};
