// pages/error.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
const ErrorPage = () => {

    return (
        <div className="flex flex-col h-screen items-center justify-center auth-background text-blue-950 ">
            <Image src="/images/339b4573a9ca2981bf553737aa7259a7-removebg-preview.png" alt="OOPS" width={200} height={200}/>
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-7">Invalid access token or provider.</h1>
                <Link href="/" className=" hover:underline text-xl">
                    Try again go back to Login
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
