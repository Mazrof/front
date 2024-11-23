
"use client"
import { useSettingsPageType } from "@/store/settings";

function Privacy() {
    const { settingPageName } = useSettingsPageType();
    const isShowPrivacy = settingPageName === "Privacy";
    return <div className={` ${!isShowPrivacy && "hidden"} settings-layout`}></div>;

}

export default Privacy
