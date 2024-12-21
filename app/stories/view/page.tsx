/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { getStories } from "@/services/Stories/Stories";
import Avatar from "@/components/SideBar/Avatar";
import Image from "next/image";

interface Story {
    content: string;
    mediaType: "photo" | "video";
    color: string;
    storyMedia: string;
}

interface FriendStories {
    username: string;
    photo: string | null;
    stories: Story[];
}

export default function ViewStories() {
    const router = useRouter();
    const [friendsStories, setFriendsStories] = useState<FriendStories[]>([]);
    const [currentFriendIndex, setCurrentFriendIndex] = useState<number>(0);
    const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleNextStory = useCallback(() => {
        setProgress(0); // Reset progress
        const currentFriend = friendsStories[currentFriendIndex];

        if (currentStoryIndex + 1 >= currentFriend.stories.length) {
            handleNextFriend();
        } else {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
        }
    }, [currentStoryIndex, friendsStories, currentFriendIndex]);

    const handlePrevStory = useCallback(() => {
        setProgress(0);
        if (currentStoryIndex === 0) {
            handlePrevFriend();
        } else {
            setCurrentStoryIndex((prevIndex) => prevIndex - 1);
        }
        clearAutoAdvanceTimer();
    }, [currentStoryIndex]);

    const handleNextFriend = useCallback(() => {
        if (currentFriendIndex + 1 >= friendsStories.length) {
            router.push("/stories");
        } else {
            setCurrentFriendIndex((prevIndex) => prevIndex + 1);
            setCurrentStoryIndex(0);
        }
    }, [currentFriendIndex, friendsStories.length]);

    const handlePrevFriend = useCallback(() => {
        if (currentFriendIndex === 0) {
            return;
        }
        setCurrentFriendIndex((prevIndex) => prevIndex - 1);
        setCurrentStoryIndex(0);
    }, [currentFriendIndex]);

    const clearAutoAdvanceTimer = useCallback(() => {
        if (autoAdvanceTimer.current) {
            clearTimeout(autoAdvanceTimer.current);
            autoAdvanceTimer.current = null;
        }
    }, []);

    useEffect(() => {
        async function fetchStories() {
            try {
                const response = await getStories();
                if (response?.status === "success" && response?.data?.allFriendsStories) {
                    const formattedStories: FriendStories[] = response.data.allFriendsStories.map(
                        (friend: {
                            username: string;
                            photo: string | null; // Allow `null`
                            stories: {
                                content: string;
                                mediaType: string;
                                color: string;
                                StoryMedia: string;
                            }[];
                        }) => ({
                            username: friend.username,
                            photo: friend.photo || "", // Fallback to an empty string if `null`
                            stories: friend.stories.map(
                                (story: {
                                    content: string;
                                    mediaType: string;
                                    color: string;
                                    StoryMedia: string;
                                }) => ({
                                    content: story.content,
                                    mediaType: story.mediaType as "photo" | "video", // Explicitly cast to expected type
                                    color: story.color,
                                    storyMedia: story.StoryMedia, // Match API response
                                })
                            ),
                        })
                    );
                    setFriendsStories(formattedStories);
                } else {
                    console.error("Invalid response structure", response);
                }
            } catch (error) {
                console.error("Failed to fetch stories", error);
            }
        }
        fetchStories();
    }, []);

    useEffect(() => {
        clearAutoAdvanceTimer();

        if (friendsStories.length > 0) {
            const currentStory = friendsStories[currentFriendIndex]?.stories[currentStoryIndex];

            if (currentStory.mediaType === "photo") {
                let progressInterval: NodeJS.Timeout | null = null;

                autoAdvanceTimer.current = setTimeout(() => {
                    handleNextStory();
                }, 5000);

                progressInterval = setInterval(() => {
                    setProgress((prev) => {
                        const newProgress = prev + 100 / (5000 / 100);
                        if (newProgress >= 100) {
                            clearInterval(progressInterval!);
                            return 100;
                        }
                        return newProgress;
                    });
                }, 100);

                return () => clearInterval(progressInterval!);
            } else if (currentStory.mediaType === "video" && videoRef.current) {
                videoRef.current.addEventListener("loadedmetadata", () => {
                    videoRef.current?.play();
                });

                const interval = setInterval(() => {
                    if (videoRef.current) {
                        const currentTime = videoRef.current.currentTime;
                        const duration = videoRef.current.duration;
                        setProgress((currentTime / duration) * 100);

                        if (videoRef.current.ended) {
                            clearInterval(interval);
                            handleNextStory();
                        }
                    }
                }, 100);

                return () => clearInterval(interval);
            }
        }
        return clearAutoAdvanceTimer;
    }, [currentFriendIndex, currentStoryIndex, friendsStories, handleNextStory, clearAutoAdvanceTimer]);

    if (friendsStories.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-500">No stories to display.</p>
            </div>
        );
    }

    const currentFriend = friendsStories[currentFriendIndex];
    const currentStory = currentFriend.stories[currentStoryIndex];

    return (
        <div
            style={{
                backgroundColor: currentStory.color,
                backgroundImage: `url(${currentStory.storyMedia})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="relative h-screen w-screen overflow-hidden"
        >
            {/* Progress Bar */}
            <div className="absolute left-0 right-0 top-4 h-1 bg-gray-200">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-1 bg-blue-500 transition-all"
                ></div>
            </div>

            {/* Username and Avatar */}
            <div className="absolute top-6 left-6 flex items-center space-x-2">
                {currentFriend.photo ? (
                    <Image
                        src={currentFriend.photo}
                        alt={currentFriend.username}
                        width={50}
                        height={50}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                ) : (
                    <Avatar name={currentFriend.username} />
                )}
                <span className="text-white text-lg font-semibold">{currentFriend.username}</span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center px-6">
                {/* Previous Button */}
                <button
                    onClick={handlePrevStory}
                    aria-label="previous"
                    className="absolute left-0 top-0 z-20 h-full w-1/3 border-none bg-transparent shadow-none"
                ></button>

                {/* Story Content */}
                {currentStory.mediaType === "photo" && currentStory.content && (
                    <div
                        className="text-center text-3xl font-semibold text-white sm:text-4xl"
                        data-test="story-text"
                    >
                        {currentStory.content}
                    </div>
                )}
                {currentStory.mediaType === "video" && (
                    <video
                        ref={videoRef}
                        src={currentStory.storyMedia}
                        className="h-full w-full object-cover"
                        playsInline
                    ></video>
                )}

                {/* Next Button */}
                <button
                    onClick={handleNextStory}
                    aria-label="Next"
                    className="absolute right-0 top-0 h-full w-1/3 border-none bg-transparent shadow-none"
                ></button>
            </div>

            {/* Back Home Button */}
            <button
                onClick={() => {
                    clearAutoAdvanceTimer();
                    router.push("/stories");
                }}
                
                aria-label="BackHome"
                className="absolute bottom-6 left-6 z-30 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-red-700"
            >
                Back Home
            </button>
        </div>
    );
}
