"use client"
import React from 'react'
import { useSelectedChtaId } from"@/store/user"
function SideBar() {
  const { isSelectedChatId } = useSelectedChtaId();
  const isSelectedChat = isSelectedChatId()

  return (
    <div className={`px-2 ${isSelectedChat &&"hidden" } lg:block max-w-[500px] sm:min-w-[530px] sm:w-[600px] bg-white z-10 border-r-2 border-white`}>
      Side Bar
    </div>
  )
}

export default SideBar
