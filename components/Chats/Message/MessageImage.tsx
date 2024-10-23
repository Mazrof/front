"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMessageContext } from "@/provider/MessageProvider";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export function MessageImage() {
    let { imageUrl } = useMessageContext();
    imageUrl = imageUrl || [];
    const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
    const [selectedImage, setSelectedImage] = useState<number>(-1);
    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsOpen(true);
    };
    return (
        <div className="flex w-full flex-wrap">
            {imageUrl.slice(0, 4).map((img, index) => (
                <figure
                    key={index}
                    className={`relative ${imageUrl.length === 1 ? "w-full" : "w-1/2"}`}
                    onClick={() => handleImageClick(index)}
                >
                    <Image
                        src={img}
                        width={1000}
                        height={1000}
                        alt={`photo ${index}`}
                        className="block h-full w-full object-cover"
                    />
                    {index === 3 && (imageUrl ? imageUrl.length : 0) > 3 && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 text-lg font-bold text-white">
                            +{imageUrl.length - 4}
                        </div>
                    )}
                </figure>
            ))}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="container w-full border-none bg-transparent p-16 text-white shadow-none outline-none sm:max-w-3xl lg:max-w-7xl">
                    <div className="flex items-center justify-center space-x-12">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                if (selectedImage) setSelectedImage(selectedImage - 1);
                            }}
                        >
                            <MoveLeftIcon />
                        </Button>

                        <div className="flex items-center justify-center space-y-4">
                            <Image
                                src={imageUrl[selectedImage]}
                                width={1000}
                                height={1000}
                                // layout="responsive"
                                alt={`Preview Image ${selectedImage + 1}`}
                                className="h-auto w-full rounded-lg object-cover"
                            />
                        </div>

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                if (selectedImage + 1 < imageUrl.length) {
                                    setSelectedImage(selectedImage + 1);
                                }
                            }}
                        >
                            <MoveRightIcon />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
