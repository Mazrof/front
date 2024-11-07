import { create } from "zustand";
import {
    InputMessageStore,
    ShowFileOptions,
    isRecordingOption,
    ShowSideBar,
    FileInfo,
    FileInput,
    OpenAlert,
    isMaxSizeError,
    StickersGifsArray,
    StickerGif,
} from "@/types/inputMessage";
const useInputTextMessage = create<InputMessageStore>((set) => ({
    textMessage: "",
    setTextMessage: (newMessage: string) => set({ textMessage: newMessage }),
    setEmoji: (emoji) => set((state) => ({ textMessage: state.textMessage + emoji })),
}));

const useShowFileOptions = create<ShowFileOptions>((set) => ({
    isShow: false,
    setIsShow: () => set((state) => ({ isShow: !state.isShow })),
}));
const useIsRecording = create<isRecordingOption>((set) => ({
    isRecording: false,
    setIsRecording: (isRecord) => set({ isRecording: isRecord }),
}));
const useShowSideBar = create<ShowSideBar>((set) => ({
    isShow: false,
    setIsShow: (newIsShow) => set({ isShow: newIsShow }),
}));
const useFileInfo = create<FileInfo>((set) => ({
    url: "",
    fileType: "",
    setUrl: (newUrl: string) => set({ url: newUrl }),
    setFileType: (newType: string) => set({ fileType: newType }),
}));
const useFileInput = create<FileInput>((set) => ({
    uploadedFile: null,
    caption: "",
    setUploadedFile: (newFile: File | null) => set({ uploadedFile: newFile }),
    setCaption: (newCaption: string) => set({ caption: newCaption }),
}));
const useOpenAlert = create<OpenAlert>((set) => ({
    isOpenAlert: false,
    setIsOpenAlert: (newIsOpen: boolean) => set({ isOpenAlert: newIsOpen }),
}));
const useIsMaxSizeError = create<isMaxSizeError>((set) => ({
    isMaxSize: false,
    setIsMaxSize: (newIsMaxSize: boolean) => set({ isMaxSize: newIsMaxSize }),
}));
const useStickersGifs = create<StickersGifsArray>((set) => ({
    stickers: [],
    gifs: [],
    setGifs: (newGifs: StickerGif[]) => set({ gifs: newGifs }),
    setStickers: (newStickers: StickerGif[]) => set({ stickers: newStickers }),
}));

export {
    useInputTextMessage,
    useShowFileOptions,
    useIsRecording,
    useShowSideBar,
    useFileInfo,
    useFileInput,
    useOpenAlert,
    useIsMaxSizeError,
    useStickersGifs,
};
