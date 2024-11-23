"use client";
import { useSettings, useSettingsPageType } from "@/store/settings";
import Nav from "./Nav";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { updateProfile } from "@/services/Settings";
import { Button } from "../ui/button";
import { SettingsObject } from "@/types/settings";

function Storage() {
    const { settingPageName } = useSettingsPageType();
    const isShowStorage = settingPageName === "Storage";
    const { settings, setSettings } = useSettings();

    const defaultSize =
        settings?.autoDownloadSizeLimit !== undefined ? [settings.autoDownloadSizeLimit] : [50];

    const [value, setValue] = useState<number[]>(defaultSize);

    useEffect(() => {
        setValue([settings?.autoDownloadSizeLimit ?? 50]);
    }, [settings?.autoDownloadSizeLimit, settingPageName]);

    function handleValueChange(newValue: number[]) {
        setValue(newValue);
    }

    async function saveToBackend(size: number[]) {
        await updateProfile("autoDownloadSizeLimit", size[0]);
        if (settings) {
            const newSettings: SettingsObject = { ...settings, autoDownloadSizeLimit: size[0] };
            setSettings(newSettings);
        }

    }

    return (
        <div className={` ${!isShowStorage && "hidden"} settings-layout`}>
            <Nav />
            <h2 className="text-violet-500">Automatic media download</h2>
            <div className="flex w-full justify-between">
                <h2>Max Media Size</h2>
                <h2>{value} MB</h2>
            </div>

            <Slider
                value={value}
                max={100}
                step={1}
                className="w-full"
                onValueChange={handleValueChange}
            />

            <Button
                onClick={() => saveToBackend(value)}
                variant="ghost"
                className="mx-auto my-10 text-lg"
            >
                Save
            </Button>
        </div>
    );
}

export default Storage;
