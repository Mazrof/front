export type MessageType = {
    text?: string | undefined;
    imageUrl?: string[] | undefined;
    createdAt?: string | undefined;
    videoUrl?: string[] | undefined;
};
export type MessageTypeBE = {
    id?: number;
    createdAt: string;
    inputMessageMentions: null | number[];
    isAnnouncement: boolean;
    isForward: boolean;
    updatedAt: string;
    content: null | string;
    url: null | string;
    senderId: number;
    replyTo: number | null;
    participantId: number;
    status: "pinned" | "drafted" | null;
    channelOrGroupId?: number;
    durationInMinutes:null|string
};