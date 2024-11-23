
"use client"
import { useSettingsPageType } from "@/store/settings";

function ProfileUpdate() {
    const { settingPageName } = useSettingsPageType();
    const isShowUpdateProfile = settingPageName === "Profile Update";
    return <div className={` ${!isShowUpdateProfile && "hidden"} settings-layout`}></div>;
 
}

export default ProfileUpdate
