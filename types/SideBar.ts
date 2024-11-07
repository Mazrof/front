import { Dispatch, SetStateAction } from "react";
export interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    pinned: boolean;
}
export type ShowContacts = boolean;

export type SetShowContacts = Dispatch<SetStateAction<ShowContacts>>;

export type DarkMode = boolean;
export type SetDarkMode = Dispatch<SetStateAction<DarkMode>>;

export type SetChat = Dispatch<SetStateAction<Chat>>;
