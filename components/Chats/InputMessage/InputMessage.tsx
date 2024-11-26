"use client";
import EmojiStickersGif from "./EmojiStickersGif";
import AttachFiles from "./AttachFiles";
import { useInputTextMessage } from "@/store/inputMessage";
import InputMessageButtons from "./InputMessageButtons";
function InputMessage({ placeHolder }: { placeHolder: string }) {
    const { textMessage, setTextMessage } = useInputTextMessage();
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTextMessage(event.target.value.trimStart());
    }
    return (
        <form
            className={`absolute bottom-5 -ml-12 mt-auto flex w-[90%] items-center justify-between`}
        >
            <div className="relative flex w-full min-w-full items-center justify-center">
                <EmojiStickersGif/>
                <div className={`bottom-4 w-[78%]`}>
                    <input
                        type="text"
                        placeholder={placeHolder}
                        className="h-14 w-full rounded-xl bg-white px-14 py-3 text-xl outline-none placeholder:text-gray-500 dark:bg-black dark:text-white"
                        value={textMessage}
                        onChange={(event) => handleOnChange(event)}
                        data-testid="inputMessageField"
                    />
                </div>
                <AttachFiles  />
            </div>
            <InputMessageButtons />
        </form>
    );
}

export default InputMessage;
