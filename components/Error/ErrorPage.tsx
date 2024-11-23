"use client";
import Link from "next/link";
import Image from "next/image";
const ErrorPage = ({ message }: {message: string }) => {
    return (
        <div className="auth-background flex h-screen flex-col items-center justify-center text-blue-950">
            <Image
                src="/images/339b4573a9ca2981bf553737aa7259a7-removebg-preview.png"
                alt="OOPS"
                width={200}
                height={200}
            />
            <div className="text-center">
                {/* <h1 className="mb-7 text-2xl font-bold">Invalid access token or provider.</h1> */}
                <h1 className="mb-7 text-2xl font-bold"> {message} </h1>
                <Link href="/" className="text-xl hover:underline">
                    Try again
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
