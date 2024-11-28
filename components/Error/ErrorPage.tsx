"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ErrorPage = ({ message }: { message: string }) => {
    const router = useRouter();

    const handleRetry = () => {
        router.refresh(); // Resets the state and re-fetches any server-side data
    };

    return (
        <div className="auth-background flex h-screen flex-col items-center justify-center text-blue-950">
            <Image
                src="/images/339b4573a9ca2981bf553737aa7259a7-removebg-preview.png"
                alt="OOPS"
                width={200}
                height={200}
            />
            <div className="text-center">
                <h1 className="mb-7 text-2xl font-bold">{message}</h1>
                <button
                    onClick={handleRetry}
                    className="cursor-pointer border-none bg-transparent text-xl text-blue-700 hover:underline"
                >
                    Try again
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
