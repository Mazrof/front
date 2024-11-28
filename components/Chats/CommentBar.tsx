import React from 'react';
//import {useState} from 'react';
import { useRouter } from 'next/navigation';
import { LeftArrowIcon, SearchIcon } from '@/utils/icons';
const CommentBar = () => {
    const router = useRouter();
    //const[commentNumber,setCommentNumber]=useState<number>(0);
    return (
        <div className="border-2 border-gray-200 bg-white text-black p-4" id='comment-bar'>
            <div className="container mx-auto flex justify-between items-center">
                <button
                    onClick={() => router.push('../')}
                    className="mb-4 p-4 bg-red-600 text-white rounded-lg"
                >
                    <LeftArrowIcon/>
                </button>
                <div>
                    0 Comment
                </div>
                <button
                    className="mb-4 p-4 bg-gray-600 text-white rounded-lg"
                >
                    <SearchIcon/>
                </button>
            </div>
        </div>
    );
};

export default CommentBar;

