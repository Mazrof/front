"use client";
import { AvatarPhoto } from "./Avatar";
import { useSettings } from "@/store/settings";
import DisplayInfoList from "./DisplayInfoList";

function ShowProfileInfo() {
    const { settings } = useSettings();
    return (
        <div className="flex w-full flex-col gap-6 border-b-2 border-gray-600">
            <div className="flex flex-col items-center gap-5">
                <div className="h-32 w-32">
                    <AvatarPhoto prop={{ url: settings?.photo }} data-test="settings-avatar" />
                </div>
                <h2 data-test="settings-screenName">{settings?.screenName}</h2>
            </div>
            <DisplayInfoList />
        </div>
    );
}

export default ShowProfileInfo;
