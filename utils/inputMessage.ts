import { MessageType, MessageTypeBE } from "@/types/Message";
import imageCompression from "browser-image-compression";
export function checkClickOutside(event: MouseEvent, element: HTMLDivElement | null) {
    return element && !element.contains(event.target as Node);
}
export function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function formatFileSize(size: number | undefined) {
    if (size) {
        if (size < 1024) return size + " Bytes";
        else if (size < 1024 * 1024) return Math.round(size / 1024) + " KB";
        else return Math.round(size / (1024 * 1024)) + " MB";
    } else return "";
}
export function isAllowedFileSize(size: number, userMaxSize: number) {
    const maxSize = userMaxSize * 1024 * 1024; // 100 MB in bytes
    return size <= maxSize;
}
export const KnowFileType = (file: File) => {
    const fileType = file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
          ? "video"
          : file.name.split(".")[1];
    return fileType;
};
export const compressMedia = async (file: File | null) => {
    if (file) {
        const fileType = KnowFileType(file);
        if (fileType === "image") {
            return await compressImage(file);
        } else return file;
    }
};
export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    try {
        const compressedFile = await imageCompression(file, options);
        if (compressedFile.size < file.size) {
            return compressedFile; // Use the compressed version
        } else {
            return file; // Keep the original if it's already smaller
        }
    } catch (error) {
        console.log(error);
        return file;
    }
};

export const convertFileToImageVideo = (
    file: File | null,
    setFileType: (newType: string) => void,
    setUrl: (newUrl: string) => void,
    setIsOpenAlert: (newIsOpen: boolean) => void
) => {
    if (file) {
        const fileType = KnowFileType(file);
        if (!fileType) return;
        setFileType(fileType);
       
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            if (typeof result === "string") {
                setUrl(result);
                setIsOpenAlert(true);
                console.log("file",result)
            }
        };
        reader.readAsDataURL(file);
    }
};

export function getFileType(fileType: string) {
    return fileType === "" || fileType === "image" || fileType === "video" ? fileType : "file";
}
export const convertToBase64 = (
    file: Blob | File,
    callback: (base64: string | null, error: string | null) => void
) => {
    const reader = new FileReader();

    reader.onload = () => {
        const base64String = reader.result as string;
        callback(base64String, null);
    };

    reader.onerror = (error) => {
        callback(null, `Error: ${error}`);
    };

    reader.readAsDataURL(file);
};
export function handleReturned(
    oldMessage: MessageTypeBE,
    newMessage: MessageTypeBE
): MessageTypeBE {
    if (newMessage.url) {
        try {
            const object: MessageType = JSON.parse(oldMessage.content as string);

            // Build the updated object
            const newObj: MessageType = {
                audioUrl: object.audioUrl ? newMessage.url : object.audioUrl,
                imageUrl: object.imageUrl ? [...object.imageUrl, newMessage.url] : object.imageUrl,
                videoUrl: object.videoUrl ? [...object.videoUrl, newMessage.url] : object.videoUrl,
                documentUrl: object.documentUrl ? [...object.documentUrl, newMessage.url] :  object.documentUrl,
                type: object.type,
            };

            // Merge and stringify the updated content
            return { ...newMessage, content: JSON.stringify({ ...object, ...newObj }) };
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return newMessage;
        }
    }

    return newMessage;
}