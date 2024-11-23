"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Story {
  createdAt: number; // Timestamp of story creation (in milliseconds)
  text: string; // Example: Story text content
  color: string; // Color background for the story
}

export default function ViewStories() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  useEffect(() => {
    // Load stories from local storage
    const storedStories = JSON.parse(localStorage.getItem("stories") || "[]");
    console.log("Loaded stories from local storage:", storedStories);

    const now = Date.now();
    const validStories = storedStories.filter((story: Story) => {
      if (
        typeof story.createdAt !== "number" ||
        story.createdAt.toString().length !== 13
      ) {
        console.warn("Invalid createdAt format, skipping story:", story);
        return false;
      }
      return now - story.createdAt < 5 * 60 * 1000; // 5 minutes expiration
    });

    console.log("Valid stories after filtering by 5 minutes:", validStories);
    setStories(validStories);

    // Set up an interval to remove expired stories every minute
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
    // Automatically show the first story when the component loads or when index changes
    if (stories.length > 0 && currentStoryIndex < stories.length) {
      const timer = setTimeout(() => {
        handleNext(); // Move to next story after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, stories]); // Depend on both currentStoryIndex and stories to ensure proper updates

  const handleNext = () => {
    // Check if all stories have been displayed
    if (currentStoryIndex + 1 >= stories.length) {
      router.push("/stories"); // Redirect to home page after last story
    } else {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  // Show a message if there are no valid stories to display
  if (stories.length === 0) {
    return <div>No stories to display.</div>;
  }

  const currentStory = stories[currentStoryIndex];

  return (
    <div style={{ backgroundColor: currentStory.color }}>
      <div className="h-screen w-screen flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 text-white rounded"
        >
          &#9664;
        </button>
        <div className="text-white text-center text-2xl">
          {currentStory.text}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 text-white rounded"
        >
          &#9654;
        </button>
      </div>
      <button
        onClick={() => router.push("/stories")}
        className="mb-4 ml-4 p-4 bg-red-600 text-white rounded-lg"
      >
        Back Home
      </button>
    </div>
  );
}
