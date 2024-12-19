import { SettingsObject } from "./settings";
import { MessageType } from "./Message";
import { ChannelData } from "./channel";
import { GroupData } from "./group";
export type PickTwoKeys<T, K1 extends keyof T, K2 extends keyof T> = {
    [Key in K1 | K2]: T[Key];
};

export type SelectedChatRoom = {
    selectedChatRoom: ChatRoom | null;
    setChatRoom: (newRoom: ChatRoom | null) => void;
    isSelectedChatRoom: () => boolean;
};
export type UserType = {
    id: string;
};

export type WhoAmI = {
    user: {
        id: number;
        userType: string;
    };
};
export type useWhoAmIType = {
    user: WhoAmI | null;
    setWhoAmI: (newUser: WhoAmI) => void;
};
export type BlockUser = {
    id: string;
    photo: string;
    username: string;
    phone?: string;
};
export type BlockListResponse = {
    blockList: { blockedUser: BlockUser }[];
    phone?: string;
};
export type BlockUsers = {
    blockUsers: BlockUser[] | null;
    setBlockUsers: (userList: BlockUser[]) => void;
    removeBlockUser: (user: BlockUser) => void;
};

export type User = PickTwoKeys<SettingsObject, "id", "username">;
export type MemberRole = {
    role: "member" | "admin";
};

type Member = {
    active: boolean;
    hasDownloadPermissions: boolean;
    role: MemberRole;
    userId: number;
    users: {
        username: string;
    };
};
export type ChannelMember = Member & {
    channelId: number;
};
export type GroupMember = Member & {
    groupId: number;
};

export type ChatRoom = {
    id: number;
    type?: "personalChat" | "group" | "channel";
    lastMessage?: MessageType;
    channel?: ChannelData;
    group?: GroupData;
    secondUser?: SecondUser;
    messagesCount?: number;
};

export type ChannelGroupChatRoom = {
    id: number;
    name: string;
    privacy: boolean;
    creatorId: number;
    active: boolean;
    communityId: number;
    canAddComments?: boolean;
    groupSize?: number;
    invitationLink: string;
};
export type SecondUser = {
    id: number;
    username: string;
    email?: string;
    photo?: string;
    screenName: null | string;
    phone: string;
    publicKey: string;
    lastSeen?: null | string;
    activeNow?: boolean | null;
};

export type FirstTimeChat = {
    isFirstTime: boolean;
    setIsFirstTime: (newIsFirst: boolean) => void;
};
export type MyChats = ChatRoom[];

export type user = {
    id: string;
    username: string;
    status: boolean;
    email: string;
    bio: string;
    activeNow: boolean;
    phone: string;
};

export type Group = {
    id: string;
    groupSize: number;
    hasFilter: boolean;
    community: {
        name: string;
        privacy: boolean;
    };
};

export type Keys = {
    publicKey: string;
    privateKey: string;
};
