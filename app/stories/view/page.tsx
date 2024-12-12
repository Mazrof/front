"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Story {
    createdAt: number;
    text: string;
    color: string;
    backgroundImage?: string; // Image URL or base64
    mediaType: "image" | "video"; // Image or video story
    backgroundMedia?: string; // Media URL (image or video)
}

export default function ViewStories() {
    const router = useRouter();
    const [stories, setStories] = useState<Story[]>([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setProgress(0); // Reset progress
        if (currentStoryIndex + 1 >= stories.length) {
            router.push("/stories");
        } else {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
        }
    }, [currentStoryIndex, stories.length, router]);

    const handlePrev = () => {
        setProgress(0);
        setCurrentStoryIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
        clearAutoAdvanceTimer();
    };

    const clearAutoAdvanceTimer = () => {
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
    };

    useEffect(() => {
        const storedStories = JSON.parse(localStorage.getItem("stories") || "[]");

        const now = Date.now();
        const validStories = storedStories.filter((story: Story) => {
            if (typeof story.createdAt !== "number" || story.createdAt.toString().length !== 13) {
                console.warn("Invalid createdAt format, skipping story:", story);
                return false;
            }
            return now - story.createdAt < 5 * 60 * 1000;
        });

        setStories(validStories);

        const interval = setInterval(() => {
            setStories((prevStories) =>
                prevStories.filter((story) => Date.now() - story.createdAt < 5 * 60 * 1000)
            );
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        clearAutoAdvanceTimer();

        if (stories.length > 0 && currentStoryIndex < stories.length) {
            const currentStory = stories[currentStoryIndex];

            if (currentStory.mediaType === "image") {
                setProgress(0);

                let progressInterval: NodeJS.Timeout | null = null;

                // Auto-advance timer
                autoAdvanceTimer.current = setTimeout(() => {
                    handleNext();
                }, 5000); // Adjust duration as needed

                // Progress bar update logic
                progressInterval = setInterval(() => {
                    setProgress((prev) => {
                        const newProgress = prev + 100 / (5000 / 100); // Increment progress every 100ms
                        if (newProgress >= 100) {
                            clearInterval(progressInterval!);
                            return 100;
                        }
                        return newProgress;
                    });
                }, 100);

                return () => {
                    clearInterval(progressInterval!);
                };
            } else if (currentStory.mediaType === "video" && videoRef.current) {
                videoRef.current.addEventListener("loadedmetadata", () => {
                    if (videoRef.current) {
                        setVideoDuration(videoRef.current.duration);
                        videoRef.current.play();
                    }
                });

                const interval = setInterval(() => {
                    if (videoRef.current) {
                        const currentTime = videoRef.current.currentTime;
                        setProgress((currentTime / videoDuration!) * 100);
                        if (videoRef.current.ended) {
                            clearInterval(interval);
                            handleNext();
                        }
                    }
                }, 100);

                return () => clearInterval(interval);
            }
        }

        return clearAutoAdvanceTimer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStoryIndex, stories, handleNext]);

    if (stories.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-500">No stories to display.</p>
            </div>
        );
    }

    const currentStory = stories[currentStoryIndex];

    return (
        <div
            style={{
                backgroundColor: currentStory.color,
                backgroundImage: currentStory.backgroundMedia
                    ? `url(${currentStory.backgroundMedia})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="relative h-screen w-screen overflow-hidden"
        >
            {/* Progress Bar */}
            <div className="absolute left-0 right-0 top-4 h-1 bg-gray-200">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-1 bg-blue-500 transition-all "
                ></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center px-6">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-0 h-full w-1/3 border-none bg-transparent shadow-none z-20"
                ></button>

                {/* Story Content */}
                {currentStory.mediaType === "image" && currentStory.text && (
                    <div className="text-center text-3xl font-semibold text-white sm:text-4xl">
                        {currentStory.text}
                    </div>
                )}
                {currentStory.mediaType === "video" && currentStory.backgroundMedia && (
                    <video
                        ref={videoRef}
                        src={currentStory.backgroundMedia}
                        className="h-full w-full object-cover"
                        playsInline
                    ></video>
                )}

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-0 h-full w-1/3 border-none bg-transparent shadow-none"
                ></button>
            </div>

            {/* Back Home Button */}
            <button
                onClick={() => {
                    clearAutoAdvanceTimer(); // Clear any ongoing timers
                    router.push("/stories");
                }}
                className="absolute bottom-6 left-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-red-700 z-30"
            >
                Back Home
            </button>
        </div>
    );
}
