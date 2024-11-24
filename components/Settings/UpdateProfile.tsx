
"use client"
import { useSettingsPageType } from "@/store/settings";
import Nav from "./Nav";
function ProfileUpdate() {
    const { settingPageName } = useSettingsPageType();
    const isShowUpdateProfile = settingPageName === "Profile Update";
    return <div className={` ${!isShowUpdateProfile && "hidden"} settings-layout`}>
        <Nav />
        
    </div>;
 
}

export default ProfileUpdate
