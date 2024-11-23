import { useSettingsPageType } from "@/store/settings";
import Block from "./Block";
import Devices from "./Devices";
import PersonalSettings from "./PersonalSettings";
import Privacy from "./Privacy";
import PrivacySecurity from "./PrivacySecurity";
import ProfileUpdate from "./UpdateProfile";
import { getProfile } from "@/services/Settings";
import { useSettings } from "@/store/settings";
import { SettingsObject } from"@/types/settings"
import { useEffect } from "react";
import Storage from "./Storage";
function Settings() {
    const { settingPageName } = useSettingsPageType()
    const isShowSettings = settingPageName !== null
    const { setSettings } = useSettings()
    const fetchProfile = async () => {
        const settings: SettingsObject = await getProfile();
        setSettings(settings);
    };
    useEffect(() => {
        fetchProfile()
    },[])
    return (
        <div className={`bg-white text-black dark:bg-black dark:text-white text-lg  w-full md:w-1/3 p-4 ${!isShowSettings && "hidden"} overflow-y-auto custom-scrollbar max-h-screen`}>
            <PersonalSettings />
            <Block />
            <Devices />
            <ProfileUpdate />
            <Privacy />
            <PrivacySecurity />
            <Storage/>
        </div>
    );
}

export default Settings;
