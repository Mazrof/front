
"use client"
import { useSettingsPageType } from "@/store/settings";
import Nav from "./Nav";

function Devices() {
    const { settingPageName } = useSettingsPageType();
    const isShowDevices = settingPageName === "Devices";
    return <div className={` ${!isShowDevices && "hidden"} settings-layout`}>
        <Nav/>
    </div>;

}

export default Devices
