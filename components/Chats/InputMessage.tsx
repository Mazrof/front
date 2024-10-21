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
        <form className={`absolute bottom-5  mt-auto  flex w-[90%] items-center justify-between -ml-12`}>
            <div className="relative flex min-w-full w-full items-center justify-center ">
                <Emoji />
                <div className={`bottom-4 w-[78%]`}>
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
