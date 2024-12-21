"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { sendStory } from "@/services/Stories/Stories"; 
export default function CreateStoryWithPhoto() {
    const [photo, setPhoto] = useState<string | null>(null); // Base64 string of the captured photo
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for the video element
    const canvasRef = useRef<HTMLCanvasElement>(null); // Reference for the canvas element
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false); // Camera state
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Submission state
    const router = useRouter();

    // Open the camera
    const openCamera = async () => {
        setIsCameraOpen(true);
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        videoRef.current!.srcObject = stream;
        videoRef.current!.play();
    };

    // Take a photo
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the video frame on the canvas
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert the canvas content to a base64 string
            const dataUrl = canvas.toDataURL("image/png");
            setPhoto(dataUrl); // Store the base64 string in state

            // Stop the video stream
            const stream = video.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            setIsCameraOpen(false);
        }
    };

    // Save the photo as a story
    const saveStory = async () => {
        if (!photo) {
            alert("No photo to save!");
            return;
        }

        const storyData = {
            content: "", // No text content
            mediaType: "photo",
            color: "blue", // No specific color as a background for the photo
            storyMedia: photo,
        };

        setIsSubmitting(true);
        try {
            await sendStory(storyData); // Call the backend API
            router.push("/stories"); // Navigate to the stories page
        } catch (error) {
            console.error("Error submitting the story:", error);
            alert("Failed to save the story. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 p-6">
            <h1 className="mb-6 text-3xl font-extrabold tracking-wide text-white drop-shadow-lg">
                Create Your Story with a Photo
            </h1>

            {!isCameraOpen && !photo && (
                <button
                    onClick={openCamera}
                    className="transform rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg hover:scale-105 hover:bg-blue-700"
                >
                    Open Camera
                </button>
            )}

            {isCameraOpen && (
                <div className="relative">
                    <video
                        ref={videoRef}
                        className="w-full max-w-md rounded-lg shadow-lg"
                        autoPlay
                        playsInline
                        aria-label="Camera Preview"
                    />
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <button
                        onClick={takePhoto}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-green-500 px-6 py-3 text-white shadow-lg hover:scale-105 hover:bg-green-600"
                    >
                        Capture Photo
                    </button>
                </div>
            )}

            {photo && (
                <div className="mt-6 flex flex-col items-center rounded-lg bg-white bg-opacity-70 p-4 shadow-xl">
                    <Image
                        src={photo}
                        alt="Captured Story"
                        width={400}
                        height={400}
                        style={{ width: "auto", height: "auto" }}
                        className="rounded-lg shadow-lg"
                    />
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={saveStory}
                            className="transform rounded-lg bg-green-600 px-6 py-2 text-white shadow-lg hover:scale-105 hover:bg-green-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Story"}
                        </button>
                        <button
                            onClick={() => setPhoto(null)}
                            className="transform rounded-lg bg-red-600 px-6 py-2 text-white shadow-lg hover:scale-105 hover:bg-red-700"
                        >
                            Retake Photo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
