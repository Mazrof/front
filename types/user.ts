import { SettingsObject } from "./settings";

export type PickTwoKeys<T, K1 extends keyof T, K2 extends keyof T> = {
    [Key in K1 | K2]: T[Key];
};

export type SelectedChatId = {
    id: string | null;
    setChatId: (newId: string | null) => void;
    isSelectedChatId: () => boolean;
};
export type UserType = {
    id: string;
};

export type UserToken = {
    access_token?: string;
    refresh_token?: string;
    error?: string;
    user: UserType;
};
export type WhoAmI = {
    user: {
        id: string;
        username: string;
    };
};

export type BlockUser = {
    userId: string;
    photo: string;
    phone: string;
    username: string;
};
export type BlockUsers = {
    blockUsers: BlockUser[] | null;
    setBlockUsers: (userList: BlockUser[]) => void;
    removeBlockUser: (user: BlockUser) => void;
};

export type User = PickTwoKeys<SettingsObject, "id", "username">;
