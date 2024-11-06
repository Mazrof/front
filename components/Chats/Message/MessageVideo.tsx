"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import { useMessageContext } from "@/provider/MessageProvider";

export function MessageVideo() {
    const [selectedVideo, setSelectedVideo] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    let { videoUrl } = useMessageContext();

    const handleVideoClick = (index: number) => {
        setSelectedVideo(index);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false); // Close the dialog
    };

    videoUrl = videoUrl || [];

    return (
        <div className="flex w-full flex-wrap">
            {videoUrl.slice(0, 4).map((video, index) => (
                <figure
                    key={index}
                    className={`relative ${videoUrl.length === 1 ? "w-full" : "w-1/2"}`}
                    onClick={() => handleVideoClick(index)}
                >
                    <Image
                        src={
                            "https://media.istockphoto.com/id/1149317024/vector/emoticon-with-sorry-sign.jpg?s=612x612&w=0&k=20&c=wwaOI9ajJ9l8ImT7BgdD0joDR2if0tlydqXEyMUl3d8="
                        }
                        width={200}
                        height={200}
                        alt={`video ${index + 1}`}
                        className="cursor-pointer rounded-md object-cover"
                    />
                    <p>{` video ${index + 1}`}</p>
                    {index === 3 && videoUrl.length > 4 && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 text-lg font-bold text-white">
                            +{videoUrl.length - 4}
                        </div>
                    )}
                </figure>
            ))}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    className="flex h-[90vh] items-center justify-center border-none bg-transparent p-8 text-white"
                    onClick={(e) => e.stopPropagation()} // Prevent dialog close on content click
                >
                    <div className="flex items-center justify-center space-x-6">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                if (selectedVideo > 0) setSelectedVideo(selectedVideo - 1);
                            }}
                            disabled={selectedVideo === 0}
                            aria-label="Previous Video"
                        >
                            <MoveLeftIcon />
                        </Button>
                        <div className="h-full w-full">
                            {selectedVideo >= 0 && (
                                <ReactPlayer
                                    url={videoUrl[selectedVideo]}
                                    controls
                                    width={"60vw"}
                                    height={`${window.innerWidth < 768 ? "40vh" : "60vh"}`}
                                    aria-label={`video ${selectedVideo + 1}`}
                                />
                            )}
                        </div>
                        <Button
                            aria-label="Next Video"
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                if (selectedVideo < videoUrl.length - 1) {
                                    setSelectedVideo(selectedVideo + 1);
                                }
                            }}
                            disabled={selectedVideo === videoUrl.length - 1}
                        >
                            <MoveRightIcon />
                        </Button>
                    </div>
                </DialogContent>

                <div className="absolute inset-0" onClick={handleCloseDialog}></div>
            </Dialog>
        </div>
    );
}
