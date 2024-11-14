"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <button
                onClick={() => router.push('/stories/create')}
                className="mb-4 p-4 bg-blue-600 text-white rounded-lg"
            >
                Create New Story
            </button>
            <button
                onClick={() => router.push('/stories/view')}
                className="mb-4 p-4 bg-green-600 text-white rounded-lg"
            >
                View Stories
            </button>
            <button
                onClick={() => router.push('/')}
                className="mb-4 p-4 bg-red-600 text-white rounded-lg"
            >
                Back to Home
            </button>
        </div>
    );
}
