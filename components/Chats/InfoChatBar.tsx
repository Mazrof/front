"use client";
import { LeftArrowIcon } from "@/utils/icons";

import { useSelectedChatId } from "@/store/user";
function InfoChatBar() {
    const { setChatId } = useSelectedChatId();

    function handleOnClickArrow(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setChatId("");
    }
    return (
        <div className="flex h-16 w-full items-center border-2 border-gray-200 bg-white px-5 dark:border-slate-800 dark:bg-black">
            <button
                className="rounded-full hover:bg-gray-300 md:hidden"
                onClick={(event) => handleOnClickArrow(event)}
            >
                <LeftArrowIcon />
            </button>
        </div>
    );
}

export default InfoChatBar;
