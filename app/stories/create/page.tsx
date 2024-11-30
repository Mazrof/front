"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-wide drop-shadow-md">
        Create a New Story
      </h1>
      <div className="space-y-4 space-x-4">
        <button
          onClick={() => router.push("/stories/create/photo")}
          className="p-5 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
        >
          Take Photo
        </button>
        <button
          onClick={() => router.push("/stories/create/write")}
          className="p-5 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
}
