"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function StoriesMainPage() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-6">
            <h1 className="mb-8 text-4xl font-extrabold tracking-wide text-white drop-shadow-lg">
                Welcome to Your Stories
            </h1>

            <div className="space-x-4 space-y-4">
                <button
                    onClick={() => router.push("/stories/create")}
                    className="w-full transform rounded-lg bg-blue-600 p-4 text-white shadow-lg hover:scale-105 hover:bg-blue-700 sm:w-auto"
                    data-test="story-create"
                >
                    Create a New Story
                </button>
                <button
                    onClick={() => router.push("/stories/view")}
                    className="w-full transform rounded-lg bg-green-400 p-4 text-white shadow-lg hover:scale-105 hover:bg-green-500 sm:w-auto"
                    data-test="story-view"
                >
                    View Existing Stories
                </button>
            </div>
            <button
                onClick={() => router.push("/")}
                className="mt-7 w-full transform rounded-lg bg-slate-400 p-4 text-white shadow-lg hover:scale-105 hover:bg-slate-500 sm:w-auto"
                data-test="story-backToHome"
            >
                Go Back
            </button>
        </div>
    );
}
