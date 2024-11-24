"use client";
import { getBlockedUsers } from "@/services/User";
import { useSettingsPageType } from "@/store/settings";
import { useBlockUsers } from "@/store/user";
import { BlockUser } from "@/types/user";
import React, { useEffect } from "react";
import Nav from "./Nav";
import { AvatarPhoto } from "./Avatar";
import { Unlock } from "lucide-react";
function Block() {
    const { settingPageName } = useSettingsPageType();
    const { setBlockUsers, blockUsers, removeBlockUser } = useBlockUsers();
    const isShowBlock = settingPageName === "Block";

    async function fetchBlockedUsers() {
        const data: BlockUser[] = await getBlockedUsers();
        setBlockUsers(data);
    }
    async function handleunBlock(
        event: React.MouseEvent<HTMLButtonElement>,
        blockedUser: BlockUser
    ) {
        event.preventDefault();
        //To DO call unBlockUser when connect to db
        removeBlockUser(blockedUser);
    }
    useEffect(() => {
        if (isShowBlock) fetchBlockedUsers();
    }, [isShowBlock]);
    return (
        <div className={` ${!isShowBlock && "hidden"} settings-layout`}>
            <Nav />
            <div className="flex w-full flex-col gap-8">
                {blockUsers?.map((BlockedUser) => (
                    <div
                        className="flex w-full items-center justify-between hover:rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        key={BlockedUser.userId}
                    >
                        <div className="flex items-center gap-8">
                            <div className="h-20 w-20">
                                <AvatarPhoto prop={{ url: BlockedUser?.photo }} />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <h2>{BlockedUser.username}</h2>
                                <h3 className="text-gray-400">{BlockedUser.phone}</h3>
                            </div>
                        </div>
                        <button onClick={(event) => handleunBlock(event, BlockedUser)}>
                            <Unlock className="h-8 w-8" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Block;
