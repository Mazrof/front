"use client";
import { useSettings, useSettingsPageType } from "@/store/settings";
import Nav from "./Nav";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { updateProfile } from "@/services/Settings";
import { Button } from "../ui/button";
import { SettingsObject, UpdatedSettingResponse } from "@/types/settings";
import { useRouter } from "next/navigation";
import { failResponse, genericResponse, successResponse } from "@/types/api";
function Storage() {
    const { settingPageName } = useSettingsPageType();
    const isShowStorage = settingPageName === "Storage";
    const { settings, setSettings } = useSettings();
    const router = useRouter();
    const defaultSizeDownload =
        settings?.autoDownloadSizeLimit !== undefined ? [settings.autoDownloadSizeLimit] : [50];
    const defaultSizeUpload =
        settings?.maxLimitFileSize !== undefined ? [settings.maxLimitFileSize] : [50];

    const [valueDownload, setValueDownload] = useState<number[]>(defaultSizeDownload);
    const [valueUpload, setValueUpload] = useState<number[]>(defaultSizeUpload);

    useEffect(() => {
        if (isShowStorage) {
            setValueDownload([settings?.autoDownloadSizeLimit ?? 50]);
            setValueUpload([settings?.maxLimitFileSize ?? 50]);
        }
    }, [settings?.autoDownloadSizeLimit, settings?.maxLimitFileSize, isShowStorage]);

    async function saveToBackend(sizeDownload: number[], sizeUpload: number[]) {
        const updates = {
            autoDownloadSizeLimit: sizeDownload[0],
            maxLimitFileSize: sizeUpload[0],
        };
        const response: genericResponse<UpdatedSettingResponse> = await updateProfile(updates);
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            if (
                failApiResponse?.error?.statusCode === 401 ||
                failApiResponse?.error?.statusCode === 404
            ) {
                router.push("/login");
            } else throw new Error(failApiResponse?.message);
        } else {
            const data: UpdatedSettingResponse = (
                response as successResponse<UpdatedSettingResponse>
            ).data;
            console.log(data);
            const user: SettingsObject = data.updatedUser;
            setSettings(user);
        }
    }

    return (
        <div className={` ${!isShowStorage && "hidden"} settings-layout`}>
            <Nav />
            <h2 className="text-violet-500">Automatic media download</h2>
            <div className="flex w-full flex-col gap-11">
                <div className="flex w-full flex-col gap-5">
                    <div className="flex w-full justify-between">
                        <h2>Max Media Size Auto Download</h2>
                        <h2>{valueDownload} MB</h2>
                    </div>

                    <Slider
                        value={valueDownload}
                        max={500}
                        step={1}
                        className="w-full"
                        onValueChange={(size: number[]) => setValueDownload(size)}
                    />
                </div>
                <div className="flex w-full flex-col gap-5">
                    <div className="flex w-full justify-between">
                        <h2>Max Media Size Upload</h2>
                        <h2>{valueUpload} MB</h2>
                    </div>

                    <Slider
                        value={valueUpload}
                        max={500}
                        step={1}
                        className="w-full"
                        onValueChange={(size: number[]) => setValueUpload(size)}
                    />
                </div>
            </div>
            <Button
                onClick={() => saveToBackend(valueDownload, valueUpload)}
                variant="ghost"
                className="mx-auto my-10 text-lg"
            >
                Save
            </Button>
        </div>
    );
}

export default Storage;
