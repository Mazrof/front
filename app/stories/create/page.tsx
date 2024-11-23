"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateStory() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [color, setColor] = useState("blue");
    const colors = ["blue", "green", "yellow"];

    const handleSubmit = () => {
        const story = {
            text,
            color,
            createdAt: Date.now(), // Adding a timestamp
        };

        const existingStories = JSON.parse(localStorage.getItem("stories") || "[]");
        const updatedStories = [...existingStories, story];
        localStorage.setItem("stories", JSON.stringify(updatedStories));

        router.push("/stories");
    };

    return (
        <div
            className="flex h-screen w-screen flex-col items-center justify-center"
            style={{ backgroundColor: color }}
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your story here..."
                className="w-full bg-transparent text-center text-2xl text-white focus:outline-none"
            />
            <div className="mt-4 flex gap-4">
                {colors.map((clr) => (
                    <button
                        key={clr}
                        onClick={() => setColor(clr)}
                        style={{ backgroundColor: clr }}
                        className="h-8 w-8 rounded-full"
                    ></button>
                ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 mb-4 ml-4 rounded bg-white p-2 text-black">
                Submit Story
            </button>
            <button
                onClick={() => router.push("/stories")}
                className="mb-4 ml-4 rounded-lg bg-red-600 p-4 text-white"
            >
                Go to Stories
            </button>
        </div>
    );
}
