"use client";

import { Button } from "@/components/ui/button";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";
import { Download, FileIcon } from "lucide-react";

export default function MessageFile() {
    const { documentObject } = useMessageContext();
    const { documentUrl, size, name } = documentObject as {
        documentUrl: string;
        name: string;
        size: string;
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = documentUrl;
        link.download = name || "file";
        link.click();
    };

    return (
        <>
            {documentObject && (
                <div
                    className="flex w-fit max-w-md cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md dark:bg-[rgb(39,39,39)]"
                    onClick={handleDownload}
                    role="button"
                    aria-label="Download file"
                >
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-500">
                            <FileIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{size}</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{name.split(".")[0]}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-blue-500 hover:text-blue-600"
                        >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
