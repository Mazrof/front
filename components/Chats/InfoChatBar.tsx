"use client"
import { LeftArrowIcon } from "@/utils/icons"
import { useSelectedChtaId } from "@/store/user"
function InfoChatBar() {
    const { setChatId } = useSelectedChtaId()
    function handleOnClickArrow(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setChatId("")
    }
    return (
        <div className="bg-white dark:bg-black w-full h-16 flex items-center px-5 border-gray-200 dark:border-slate-800 border-2">
            <button className="rounded-full hover:bg-gray-300" onClick={(event) => handleOnClickArrow(event)}><LeftArrowIcon /></button>
        </div>
    )
}

export default InfoChatBar
