import { useSettingsPageType } from "@/store/settings";
import Block from "./Block";
import Devices from "./Devices";
import PersonalSettings from "./PersonalSettings";
import Privacy from "./Privacy";
import PrivacySecurity from "./PrivacySecurity";
import ProfileUpdate from "./UpdateProfile";
import { getProfile } from "@/services/Settings";
import { useSettings } from "@/store/settings";
import { SettingsObject, SettingResponse } from "@/types/settings";
import { failResponse, genericResponse, successResponse } from "@/types/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Storage from "./Storage";
function Settings() {
    const { settingPageName } = useSettingsPageType();
    const isShowSettings = settingPageName !== null;
    const { setSettings } = useSettings();
    const router = useRouter();
    const fetchProfile = async () => {
        const response: genericResponse<SettingResponse> = await getProfile();
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else throw new Error(failApiResponse?.message);
        } else {
            const data: SettingResponse = (response as successResponse<SettingResponse>).data;
            const user: SettingsObject = data.user;
            setSettings(user);
        }
    };
    useEffect(() => {
        if (isShowSettings) {
            fetchProfile();
        }
    }, [isShowSettings]);
    return (
        <div
            className={`w-full bg-white p-4 text-lg text-black dark:bg-black dark:text-white md:w-2/3 lg:w-1/3 ${!isShowSettings && "hidden"} custom-scrollbar max-h-screen overflow-y-auto`}
        >
            <PersonalSettings />
            <Block />
            <Devices />
            <ProfileUpdate />
            <Privacy />
            <PrivacySecurity />
            <Storage />
        </div>
    );
}

export default Settings;
