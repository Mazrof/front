import {create} from "zustand"
import {InputMessageStore,ShowFileOptions} from"@/types/inputMessage"
const useInputTextMessage = create<InputMessageStore>((set) => ({
    textMessage:"",
    setTextMessage: (newMessage: string) => set({ textMessage: newMessage }),
    setEmoji:(emoji)=>set((state)=>({textMessage:state.textMessage+emoji}))
}))

const useShowFileOptions = create<ShowFileOptions>((set) => ({
    isShow: false,
    setIsShow: () =>set(state=>({isShow:!state.isShow}))
}))
export {useInputTextMessage,useShowFileOptions}