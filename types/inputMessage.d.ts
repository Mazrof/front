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
    setIsRecoding: (isRecording: boolean) => void;
};

export type ShowSideBar = {
    isShow: boolean,
    setIsShow:(newIsShow:boolean)=>void
}