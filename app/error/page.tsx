// pages/error.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
const ErrorPage = () => {

    return (
        <div className="flex flex-col h-screen items-center justify-center bg-blue-950">
            <Image src="/images/339b4573a9ca2981bf553737aa7259a7-removebg-preview.png" alt="OOPS" width={200} height={200}/>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Something went wrong!</h1>
                <p className="mt-4 text-[#F9f9f9]" >{"An unknown error occurred."}</p>
                <Link href="/" className="mt-6 text-white hover:underline">
                    Go back to home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
