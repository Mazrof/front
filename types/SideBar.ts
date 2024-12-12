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

export interface Contact {
    id: number;
    name: string;
    avatar: string;
    phone:number;
    email:string;
    // status: string;
  }
export interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    photo: string | null; // Photo can be null
}

export interface Channel {
    id: number;
    name: string;
    photo: string | null; // Photo can be null
}

export interface Group {
    id: number;
    name: string;
    photo: string | null; // Photo can be null
}

  export type ShowContacts = boolean;

  export type SetShowContacts = Dispatch<SetStateAction<ShowContacts>>;

  export type ShowGlobalSearch = boolean;

  export type SetShowGlobalSearch = Dispatch<SetStateAction<ShowGlobalSearch>>;

export type DarkMode = boolean;
export type SetDarkMode = Dispatch<SetStateAction<DarkMode>>;

export type SetChat = Dispatch<SetStateAction<Chat>>;
