export type SelectedChatId = {
    id: number|null;
    setChatId: (newId: number|null) => void;
    isSelectedChatId: () => boolean;
};

export type UserToken = {
    access_token?: string;
    refresh_token?: string,
    error?:string
};
