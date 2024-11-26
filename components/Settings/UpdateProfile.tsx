"use client";
import Nav from "./Nav";
import { useSettingsPageType } from "@/store/settings";
import ProfileForm from "./ProfileForm";
function ProfileUpdate() {
    const { settingPageName } = useSettingsPageType();
    const isShowUpdateProfile = settingPageName === "Profile Update";
    return (
        <div className={` ${!isShowUpdateProfile && "hidden"} settings-layout`}>
            <Nav />
            <ProfileForm/>
        </div>
    );
}

export default ProfileUpdate;
