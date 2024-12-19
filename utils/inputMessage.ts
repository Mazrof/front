import { MessageType } from "@/types/Message";
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
    console.log("file",file.type)
    const fileType = file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
          ? "video"
          : "file";
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
export  const parseMessageContent = (content: string | undefined): MessageType => {
        try {
            // Try to parse the content if it's a valid JSON string
            return JSON.parse(content as string);
        } catch (error) {
            // Handle the case where JSON is invalid
            console.error("Error parsing message content:", error);
            return {
                type: "message",
            }; // Return an empty object or a default value
        }
    };
export const getTimeWithAddedHours = (hoursToAdd: number) => {
    const date = new Date(); // Get the current time
    date.setHours(date.getHours() + hoursToAdd); // Add the specified hours
    return date.toISOString(); // Format to ISO 8601 (e.g., "2024-12-19T18:32:00.353Z")
    
};

