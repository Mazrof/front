"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface Story {
  createdAt: number;
  text: string;
  color: string;
  backgroundImage?: string; // Image URL or base64
}

export default function ViewStories() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0); // Track progress (0 to 100)

  const handleNext = useCallback(() => {
    setProgress(0); // Reset progress
    if (currentStoryIndex + 1 >= stories.length) {
      router.push("/stories");
    } else {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentStoryIndex, stories.length, router]);

  const handlePrev = () => {
    setProgress(0); // Reset progress
    setCurrentStoryIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  useEffect(() => {
    const storedStories = JSON.parse(localStorage.getItem("stories") || "[]");

    const now = Date.now();
    const validStories = storedStories.filter((story: Story) => {
      if (
        typeof story.createdAt !== "number" ||
        story.createdAt.toString().length !== 13
      ) {
        console.warn("Invalid createdAt format, skipping story:", story);
        return false;
      }
      return now - story.createdAt < 5 * 60 * 1000;
    });

    setStories(validStories);

    const interval = setInterval(() => {
      setStories((prevStories) =>
        prevStories.filter(
          (story) => Date.now() - story.createdAt < 5 * 60 * 1000
        )
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stories.length > 0 && currentStoryIndex < stories.length) {
      setProgress(0); // Reset progress on story change
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            handleNext();
            return 0;
          }
          return prev + 2; // Increment progress (adjust speed as needed)
        });
      }, 100); // Update progress every 100ms

      return () => clearInterval(timer);
    }
  }, [currentStoryIndex, stories, handleNext]);

  if (stories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">No stories to display.</p>
      </div>
    );
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <div
      style={{
        backgroundColor: currentStory.color,
        backgroundImage: currentStory.backgroundImage
          ? `url(${currentStory.backgroundImage})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative w-screen h-screen overflow-hidden"
    >
      {/* Progress Bar */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
        <div
          style={{ width: `${progress}%` }}
          className="h-1 bg-blue-500 transition-all"
        ></div>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center px-6">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-600 transition"
        >
          <span className="text-white text-xl">&#8592;</span>
        </button>

        {/* Story Text */}
        {currentStory.text && (
          <div className="text-white text-center text-3xl sm:text-4xl font-semibold">
            {currentStory.text}
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full shadow-md hover:bg-gray-600 transition"
        >
          <span className="text-white text-xl">&#8594;</span>
        </button>
      </div>

      {/* Back Home Button */}
      <button
        onClick={() => router.push("/stories")}
        className="absolute bottom-6 left-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
      >
        Back Home
      </button>
    </div>
  );
}
