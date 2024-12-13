"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6">
            <h1 className="mb-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-md">
                Create a New Story
            </h1>
            <div className="space-x-4 space-y-4">
                <button
                    onClick={() => router.push("/stories/create/photo")}
                    className="transform rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 p-5 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl"
                >
                    Take Photo
                </button>
                <button
                    onClick={() => router.push("/stories/create/write")}
                    className="transform rounded-lg bg-gradient-to-r from-green-400 to-green-600 p-5 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl"
                >
                    Upload Media
                </button>
            </div>
        </div>
    );
}
