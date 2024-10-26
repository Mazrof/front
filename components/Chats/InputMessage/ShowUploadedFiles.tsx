import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useFileInfo, useFileInput } from "@/store/inputMessage";
import { getFileType, formatFileSize } from "@/utils/inputMessage";
function ShowUploadedFiles() {
    const { uploadedFile } = useFileInput();
    const { url, fileType } = useFileInfo();
    const type = getFileType(fileType);
    return (
        <>
            {type === "image" && (
                <Image
                    src={url}
                    alt="Uploaded Image"
                    width={500}
                    height={100}
                    className="w-full object-cover"
                />
            )}
            {type === "video" && (
                <video src={url} width={500} height={100} className="w-full object-cover" />
            )}
            {type === "file" && (
                <div className="my-3 flex w-full items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center bg-blue-700 p-3 text-center text-xl text-white dark:bg-purple-700">
                        {fileType}
                    </div>
                    <div className="flex flex-col items-start justify-between">
                        <p className="text-2xl">{uploadedFile?.name}</p>
                        <p>{formatFileSize(uploadedFile?.size)}</p>
                    </div>
                </div>
            )}
            {type === ""&&
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <p>Loading ..</p>
                </>
            }
        </>
    );
}

export default ShowUploadedFiles;
