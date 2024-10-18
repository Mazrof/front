import {create} from "zustand"
import {InputMessageStore,ShowFileOptions,isRecordingOption} from"@/types/inputMessage"
const useInputTextMessage = create<InputMessageStore>((set) => ({
    textMessage:"",
    setTextMessage: (newMessage: string) => set({ textMessage: newMessage }),
    setEmoji:(emoji)=>set((state)=>({textMessage:state.textMessage+emoji}))
}))

const useShowFileOptions = create<ShowFileOptions>((set) => ({
    isShow: false,
    setIsShow: () =>set(state=>({isShow:!state.isShow}))
}))
const useIsRecording = create<isRecordingOption>(set => ({
    isRecording: false,
    setIsRecoding:(isRecord)=>set({isRecording:isRecord})
}))
export {useInputTextMessage,useShowFileOptions,useIsRecording}