export type InputMessageStore = {
    textMessage: string;
    setTextMessage: (newMessage: string) => void;
    setEmoji: (emoji: string) => void;
};
export type ShowFileOptions = {
    isShow: boolean;
    setIsShow: () => void;
};
export type isRecordingOption = {
    isRecording: boolean;
    setIsRecording: (isRecording: boolean) => void;
};

export type ShowSideBar = {
    isShow: boolean;
    setIsShow: (newIsShow: boolean) => void;
};
export type FileInfo = {
    url: string;
    fileType: string;
    setUrl: (newUrl: string) => void;
    setFileType: (newType: string) => void;
};
export type FileInput = {
    uploadedFile: File | null;
    caption: string;
    setUploadedFile: (newFile: File | null) => void;
    setCaption: (newCaption: string) => void;
};
export type OpenAlert = {
    isOpenAlert: boolean;
    setIsOpenAlert: (newIsOpen: boolean) => void;
};
export type isMaxSizeError = {
    isMaxSize: boolean;
    setIsMaxSize: (newIsMaaxSize: boolean) => void;
};
export type StickersGifsArray = {
    stickers: StickerGif[];
    gifs: StickerGif[];
    setStickers: (newStickers: StickerGif[]) => void;
    setGifs: (newGifs: StickerGif[]) => void;
};
export type StickerGif = {
    url: string;
    id: number;
};
