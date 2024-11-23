
"use client"
import { useSettingsPageType } from "@/store/settings";

function Block() {
    const { settingPageName } = useSettingsPageType();
    const isShowBlock = settingPageName === "Block";
    return <div className={` ${!isShowBlock && "hidden"} settings-layout`}></div>;

}

export default Block
