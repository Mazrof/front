/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import {
    useShowFileOptions,
    useFileInput,
    useFileInfo,
    useOpenAlert,
    useIsMaxSizeError,
} from "@/store/inputMessage";
import { UploadImageIcon, UploadFileIcon, CompressIcon } from "@/utils/icons";
import { failResponse, genericResponse, successResponse } from "@/types/api";

import { useEffect, useRef } from "react";
import {
    checkClickOutside,
    convertFileToImageVideo,
    isAllowedFileSize,
    compressMedia,
} from "@/utils/inputMessage";
import { useSettings } from "@/store/settings";
import { getProfile } from "@/services/Settings";
import { SettingsObject, SettingResponse } from "@/types/settings";
function UploadFilesOption() {
    const optionRef = useRef<HTMLDivElement | null>(null);
    const { settings, setSettings } = useSettings();
    const { isShow, setIsShow } = useShowFileOptions();
    const { setUploadedFile } = useFileInput();
    const { setUrl, setFileType } = useFileInfo();
    const { setIsOpenAlert } = useOpenAlert();
    const { setIsMaxSize } = useIsMaxSizeError();
    const router = useRouter();
    const handleClickOutside = (event: MouseEvent) => {
        if (checkClickOutside(event, optionRef.current)) {
            setIsShow();
        }
    };
    const handleOnChooseCompress = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setIsOpenAlert(true);
            const compress: File | undefined = await compressMedia(event.target.files[0]);
            filesChecks(compress); //if he close the alert before loading has been completed
        }
    };
    const getSettings = async () => {
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
    const filesChecks = async (file: File | undefined) => {
        await getSettings();
        if (!settings) return;
        if (file && isAllowedFileSize(file.size, settings?.maxLimitFileSize)) {
            convertFileToImageVideo(file, setFileType, setUrl, setIsOpenAlert);
            setUploadedFile(file);
        } else {
            setIsMaxSize(true);
            setIsOpenAlert(true);
        }
    };
    const handleOnChooseFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file: File = event.target.files[0];
            await filesChecks(file);
        }
    };
    useEffect(() => {
        if (isShow) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);
    return (
        <div
            className="absolute bottom-16 right-[8%] flex w-52 flex-col items-start rounded-md bg-gray-200 align-bottom dark:bg-gray-600"
            ref={optionRef}
        >
            <div className="file-option-container">
                <label htmlFor="compress-media-upload" className="file-option-label">
                    <CompressIcon />
                    <p>Compress Media</p>
                </label>
                <input
                    id="compress-media-upload"
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, image/gif, image/webp,video/*"
                    onChange={(event) => handleOnChooseCompress(event)}
                    data-testid="Compress Media"
                />
            </div>
            <div className="file-option-container">
                <label htmlFor="photo-upload" className="file-option-label">
                    <UploadImageIcon />
                    <p>Photo or Video</p>
                </label>
                <input
                    id="photo-upload"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(event) => handleOnChooseFile(event)}
                    data-testid="Photo or Video"
                />
            </div>
            <div className="file-option-container">
                <label htmlFor="file-upload" className="file-option-label">
                    <UploadFileIcon />
                    <p>Document</p>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(event) => handleOnChooseFile(event)}
                    data-testid="Document"
                />
            </div>
        </div>
    );
}

export default UploadFilesOption;
