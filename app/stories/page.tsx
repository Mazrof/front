"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
            <button
                onClick={() => router.push("/stories/create")}
                className="mb-4 rounded-lg bg-blue-600 p-4 text-white"
                data-test="story-create"
            >
                Create New Story
            </button>
            <button
                onClick={() => router.push("/stories/view")}
                className="mb-4 rounded-lg bg-green-600 p-4 text-white"
                data-test="story-view"
            >
                View Stories
            </button>
            <button
                onClick={() => router.push("/")}
                className="mb-4 rounded-lg bg-red-600 p-4 text-white"
                data-test="story-backToHome"
            >
                Back to Home
            </button>
        </div>
    );
}
