"use client";
import { AvatarPhoto } from "./Avatar";
import { useSettings } from "@/store/settings";
import DisplayInfoList from "./DisplayInfoList";

function ShowProfileInfo() {
    const { settings } = useSettings();
    return (
      <div className="flex w-full flex-col gap-6 border-b-2  border-gray-600 ">
            <div className="flex flex-col items-center gap-5">
                <div>
                    <AvatarPhoto props={settings?.picture} />
                </div>
                <h2>{settings?.screenName}</h2>
            </div>
            <DisplayInfoList />
        </div>
    );
}

export default ShowProfileInfo;
