"use client";
import { AttachFileIcon } from "@/utils/icons";
import UploadFilesOption from "./UploadFileOptions";
import { useShowFileOptions } from "@/store/inputMessage";
function AttachFiles() {
    const { isShow, setIsShow } = useShowFileOptions();
    function handleOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsShow();
    }
    return (
        <>
            {isShow && <UploadFilesOption />}
            <button
                className="absolute bottom-[.9rem] right-[10%] z-10 w-7"
                onClick={(event) => handleOnClick(event)}
            >
                <AttachFileIcon />
            </button>
        </>
    );
}

export default AttachFiles;
