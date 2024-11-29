export type SelectedChatId = {
    id: string | null;
    setChatId: (newId: string | null) => void;
    isSelectedChatId: () => boolean;
};
export type UserType = {
    id: string,
    
}

export type UserToken = {
    access_token?: string;
    refresh_token?: string;
    error?: string;
    user: UserType;
};
export type WhoAmI = {
    user: {
        id: string,
        username:string
    }
};
 
export type BlockUser = {
    id: string;
    photo: string;
    username: string;
    phone?:string
};
export type BlockListResponse={
    blockList:{blockedUser: BlockUser}[]
}
export type BlockUsers = {
    blockUsers: BlockUser[] | null;
    setBlockUsers: (userList: BlockUser[]) => void;
    removeBlockUser: (user: BlockUser) => void;
};
