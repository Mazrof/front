import { SettingsObject } from "./settings";
import { MessageType } from "./Message";
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
    photo?: string;
    screenName: null | string;
    phone: string;
    publicKey: string;
    lastSeen?: null | string;
    activeNow?: boolean | null;
};
export type ChatRoom = {
    id: number;
    type?: "personalChat" | "group" | "channel";
    lastMeesage?: MessageType;
    channel?: ChannelGroupChatRoom;
    group?: ChannelGroupChatRoom;
    secondUser?: SecondUser;
};
export type FirstTimeChat = {
    isFirstTime: boolean;
    setIsFirstTime: (newIsFirst: boolean) => void;
};
export type MyChats = ChatRoom[];
