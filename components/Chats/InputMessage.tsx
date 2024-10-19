"use client";
import Emoji from "@/components/Chats/Emoji";
import AttachFiles from "./AttachFiles";
import { useInputTextMessage } from "@/store/inputMessage";
import InputMessageButtons from "./InputMessageButtons";
function InputMessage({ placeHolder }: { placeHolder: string }) {
    const { textMessage, setTextMessage } = useInputTextMessage();
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTextMessage(e.target.value.trimStart());
    }
    return (
        <form className="absolute bottom-10 mx-auto mt-auto flex w-[95%] items-center justify-center">
            <div className="absolute mx-auto flex w-[90%] items-center justify-center">
                <Emoji />
                <div className="bottom-4 w-[85%]">
                    <input
                        type="text"
                        placeholder={placeHolder}
                        className="h-14 w-full rounded-xl bg-white px-14 py-3 text-xl outline-none placeholder:text-gray-500 dark:bg-black"
                        value={textMessage}
                        onChange={(e) => handleOnChange(e)}
                    />
                </div>
                <AttachFiles />
            </div>
            <InputMessageButtons />
        </form>
    );
}

export default InputMessage;
