// components/ChatList.js
import Image from "next/image";
import React from "react";

const chatData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/images/Avatar.png",
    lastMessage: "Hey! How are you?",
    time: "10:30 AM",
    unreadCount: 2,
    pinned: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "10:20 PM",
    unreadCount: 0,
    pinned: false,
  },
  {
    id: 3,
    name: "Mike Tyson",
    avatar: "/images/Avatar.png",
    lastMessage: "See you tomorrow at 3!",
    time: "2 days ago",
    unreadCount: 5,
    pinned: true,
  },
  {
    id: 4,
    name: "Nathan",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "Yesterday",
    unreadCount: 0,
    pinned: true,
  },
  {
    id: 5,
    name: "Harith",
    avatar: "/images/Avatar.png",
    lastMessage: "I will kill you watch out",
    time: "Oct 15",
    unreadCount: 0,
    pinned: false,
  },
  {
    id: 6,
    name: "Arther",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "Yesterday",
    unreadCount: 1,
    pinned: false,
  },
  {
    id: 7,
    name: "Ali",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "Yesterday",
    unreadCount: 5,
    pinned: false,
  },
  {
    id: 8,
    name: "Ahmed",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "Sep 28",
    unreadCount: 0,
    pinned: false,
  },
  {
    id: 9,
    name: "Jade",
    avatar: "/images/Avatar.png",
    lastMessage: "Got the files. Thanks!",
    time: "Aug 9",
    unreadCount: 3,
    pinned: false,
  },
];

const ChatList = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar space-y-4 p-2">
      {chatData.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center p-3 bg-[#212121] rounded-lg shadow-sm hover:bg-[#2B2B2B] transition duration-150 cursor-pointer"
        >
          <Image
            src={chat.avatar}
            alt={chat.name}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="ml-4 flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">{chat.name}</h3>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400 truncate max-w-36">
                {chat.lastMessage}
              </p>
              <div className="min-w-7 flex items-center space-x-1">
                {chat.unreadCount > 0 ? (
                  <span className="ml-2 bg-blue-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                    {chat.unreadCount}
                  </span>
                ) : (
                  <span className="text-gray-400">✔️</span>
                )}
                {chat.pinned && <span>📌</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
