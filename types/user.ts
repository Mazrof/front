export type SelectedChatId = {
    id: number|null;
    setChatId: (newId: number|null) => void;
    isSelectedChatId: () => boolean;
};

export type UserToken = {
    Token:String
}