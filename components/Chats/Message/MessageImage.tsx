export function MessageImage() {
    const message = useMessageContext();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
        setIsOpen(true);
    };

    const imageUrls = message?.imageUrl || [];
    const maxDisplayImages = 3;

    return (
        <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {imageUrls.slice(0, maxDisplayImages).map((photo, index) => (
                <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => handleImageClick(index)}
                >
                    <Image
                        src={photo}
                        width={100}
                        height={100}
                        layout="responsive"
                        alt={`Image ${index + 1}`}
                        className="h-auto w-full rounded-md object-cover"
                    />
                    {/* Show "+X" if this is the last image and there are more images */}
                    {index === maxDisplayImages - 1 && imageUrls.length > maxDisplayImages && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 text-lg font-bold text-white">
                            +{imageUrls.length - maxDisplayImages}
                        </div>
                    )}
                </div>
            ))}

            {/* Dialog Modal for Image Preview */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Image Preview</DialogTitle>
                    </DialogHeader>
                    {selectedImage !== null && (
                        <div className="flex flex-col items-center space-y-4">
                            <Image
                                src={imageUrls[selectedImage]}
                                width={800}
                                height={800}
                                layout="responsive"
                                alt={`Preview Image ${selectedImage + 1}`}
                                className="h-auto w-full rounded-lg object-cover"
                            />
                            <div className="flex space-x-4">
                                {/* Show small thumbnails for other images */}
                                {imageUrls.map((photo, idx) => (
                                    <div
                                        key={idx}
                                        className={`cursor-pointer ${idx === selectedImage ? "border-2 border-blue-500" : ""}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <Image
                                            src={photo}
                                            width={60}
                                            height={60}
                                            layout="fixed"
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
