"use client";

import { useSettingsPageType } from "@/store/settings";
import { Database, HardDrive, Lock } from "lucide-react";
import { PageNameEnum } from "@/types/settings";
import { handleOnClick } from "@/utils/settings";
function SettingsOptions() {
    const { setPageName } = useSettingsPageType();

   
    return (
        <div className="flex w-full flex-col items-start gap-3">
            <button className="flex gap-6" onClick={(event) => handleOnClick(event, "Storage",setPageName)}>
                <Database className="settings-icons" />
                <h2>Data and Storage</h2>
            </button>
            <button
                className="flex gap-6"
          onClick={(event) => handleOnClick(event, "Privacy Settings", setPageName)}
            >
                <Lock className="settings-icons" />
                <h2>Privacy and Security</h2>
            </button>
        <button className="flex gap-6" onClick={(event) => handleOnClick(event, "Devices", setPageName)}>
                <HardDrive className="settings-icons" />
                <h2>Devices</h2>
            </button>
        </div>
    );
}

export default SettingsOptions;
