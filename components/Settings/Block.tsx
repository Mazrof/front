"use client";
import { getBlockedUsers, unBlockUser } from "@/services/User";
import { useSettingsPageType } from "@/store/settings";
import { useBlockUsers } from "@/store/user";
import { BlockUser, BlockListResponse } from "@/types/user";
import React, { useEffect } from "react";
import Nav from "./Nav";
import  AvatarPhoto  from "./Avatar";
import { Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { genericResponse, failResponse, successResponse } from "@/types/api";
function Block() {
    const router = useRouter();
    const { settingPageName } = useSettingsPageType();
    const { setBlockUsers, blockUsers, removeBlockUser } = useBlockUsers();
    const isShowBlock = settingPageName === "Block";

    async function fetchBlockedUsers() {
        const response: genericResponse<BlockListResponse> = await getBlockedUsers();
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else router.push("Error");
        } else {
            const data: BlockListResponse = (response as successResponse<BlockListResponse>).data;
            const blockUsers: {
                blockedUser: BlockUser;
            }[] = data.blockList;
            const blockedUserObjects = blockUsers.map((item) => item.blockedUser);
            setBlockUsers(blockedUserObjects);
        }
    }
    async function handleunBlock(
        event: React.MouseEvent<HTMLButtonElement>,
        blockedUser: BlockUser
    ) {
        event.preventDefault();
        //To DO call unBlockUser when connect to db
        const response: genericResponse<null> = await unBlockUser(blockedUser.id);
        if (response.status === "fail" || response.status === "error") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else if (failApiResponse?.error?.statusCode === 400 || failApiResponse?.error?.statusCode===500) {
                //unblock unblocked user
                removeBlockUser(blockedUser);
            } else router.push("Error");
        } else removeBlockUser(blockedUser);
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
                        key={BlockedUser.id}
                    >
                        <div className="flex items-center gap-8">
                            <div className="h-20 w-20">
                                <AvatarPhoto prop={{ url: BlockedUser?.photo }} />
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <h2>{BlockedUser.username}</h2>
                                <h3>{BlockedUser?.phone}</h3>
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
