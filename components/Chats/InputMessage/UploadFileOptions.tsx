"use client";
import { useShowFileOptions, useFileInput, useFileInfo, useOpenAlert } from "@/store/inputMessage";
import { UploadImageIcon, UploadFileIcon } from "@/utils/icons";
import { useEffect, useRef } from "react";
import { checkClickOutside, convertFileToImageVideo } from "@/utils/inputMessage";
function UploadFilesOption() {
    const optionRef = useRef<HTMLDivElement | null>(null);
    const { isShow, setIsShow } = useShowFileOptions();
    const { setUploadedFile } = useFileInput();
    const { setUrl, setFileType } = useFileInfo();
    const { setIsOpenAlert } = useOpenAlert();

    const handleClickOutside = (event: MouseEvent) => {
        if (checkClickOutside(event, optionRef.current)) {
            setIsShow();
        }
    };
    const handleOnChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            convertFileToImageVideo(event.target.files[0], setFileType, setUrl, setIsOpenAlert);
            setUploadedFile(event.target.files[0]);
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
            className="absolute bottom-16 right-[8%] flex w-48 flex-col rounded-md bg-gray-200 dark:bg-gray-600"
            ref={optionRef}
        >
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
                />
            </div>
        </div>
    );
}

export default UploadFilesOption;
