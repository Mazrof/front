"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function StoriesMainPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
        Welcome to Your Stories
      </h1>
      
      <div className="space-y-4 space-x-4">
        <button
          onClick={() => router.push('/stories/create')}
          className="w-full sm:w-auto p-4 bg-blue-600 text-white rounded-lg shadow-lg transform transition-all hover:bg-blue-700 hover:scale-105"
        >
          Create a New Story
        </button>
        <button
          onClick={() => router.push('/stories/view')}
          className="w-full sm:w-auto p-4 bg-green-400 text-white rounded-lg shadow-lg transform transition-all hover:bg-green-500 hover:scale-105"
        >
          View Existing Stories
        </button>
      </div>
    </div>
  );
}
