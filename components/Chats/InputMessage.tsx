import React from 'react'
import Emojie from "@/components/Chats/Emojie"
function InputMessage({ placeHolder }: { placeHolder: string }) {
    return (
        <form className='absolute mt-auto flex justify-center align-middle w-[90%] mx-auto bottom-5'>
            <Emojie />
            <div className=' w-[85%]  bottom-4'>
                <input type='text' placeholder={placeHolder} className='dark:bg-black w-full bg-white h-14 py-3 pl-14 rounded-xl outline-none text-xl placeholder:text-gray-500 ' />
            </div>
        </form>
    )
}

export default InputMessage
