
"use client"
import { useSettingsPageType } from "@/store/settings";

function Devices() {
    const { settingPageName } = useSettingsPageType();
    const isShowDevices = settingPageName === "Devices";
    return <div className={` ${!isShowDevices && "hidden"} settings-layout`}></div>;

}

export default Devices
