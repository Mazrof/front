"use client";
import { useSettings, useSettingsPageType } from "@/store/settings";
import { Switch } from "@/components/ui/switch";
import Nav from "./Nav";
import { Ban } from "lucide-react";
import { handleOnClick } from "@/utils/settings";
import { updateProfile } from "@/services/Settings";
import { SettingsObject } from "@/types/settings";
function PrivacySecurity() {
    const { settingPageName, setPageName } = useSettingsPageType();
    const { settings, setSettings } = useSettings();
    const isShowPrivacySettings = settingPageName === "Privacy Settings";

    async function toggleSwitch() {
        if (settings) {
            await updateProfile("readReceiptsEnabled", !settings?.readReceiptsEnabled);
            let newSettings: SettingsObject = {
                ...settings,
                readReceiptsEnabled: !settings.readReceiptsEnabled,
            };
            setSettings(newSettings);
        }
    }
   
    return (
        <div className={` ${!isShowPrivacySettings && "hidden"} settings-layout px-5`}>
            <Nav />
            <div className="w-full border-b-2 border-gray-600 pb-7">
                <button
                    className="flex gap-6"
                    onClick={(event) => handleOnClick(event, "Block", setPageName)}
                >
                    <Ban className="settings-icons" />
                    Blocked Users
                </button>
            </div>
            <div className="flex w-full flex-col gap-6">
                <h2 className="text-violet-500">Privacy</h2>
                <button className="settings-who-can">
                    <h2>Who can see my story?</h2>
                    <h3>{settings?.storiesPrivacy}</h3>
                </button>

                <button className="settings-who-can">
                    <h2>Who can see my profile photo?</h2>
                    <h3>{settings?.profilePicturePrivacy}</h3>
                </button>
                <button className="settings-who-can">
                    <h2>Who can see my Last seen time?</h2>
                    <h3>{settings?.lastSeenPrivacy}</h3>
                </button>
                <button className="settings-who-can">
                    <h2>Who can add me to group / channel chat?</h2>
                    <h3>{settings?.groupChatPrivacy}</h3>
                </button>
                <div className="flex justify-between px-5">
                    <h2>Enable/Disable read receipts</h2>
                    <Switch checked={settings?.readReceiptsEnabled} onClick={toggleSwitch} />
                </div>
            </div>
        </div>
    );
}
export default PrivacySecurity;
