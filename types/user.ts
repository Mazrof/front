export type SelectedChatId = {
    id: string;
    setChatId: (newId: string) => void;
    isSelectedChatId: () => boolean;
};
