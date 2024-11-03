"use client";

import { useRouter } from "next/navigation";
import logo from "../../public/images/logo.jpg";
import React from "react";
import Image from "next/image";
import InputField from "./InputField";

function ForgetPasswordForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="mt-6 w-full max-w-md rounded-2xl bg-white p-8">
            {/*logo */}
            <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-blue-100">
                    <Image className="rounded-full" src={logo} alt="logo" />
                </div>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center">
                <h1 className="text-center text-3xl text-blue-800">Forgot password?</h1>
                <p className="mt-3 font-sans text-sm font-semibold text-gray-500">
                    {" "}
                    No worriers, we'll send you reset instructions
                </p>
            </div>
            <form className="gap- flex flex-col space-y-4">
                {/*Email Input */}
                <InputField label="Email" type="email" placeholder="Enter your email" />

                {/* Reset Password Button */}
                <button type="submit" className="btn">
                    Reset Password
                </button>
                {/* Create an Account Button */}
            </form>
            <div className="mt-4 flex items-center justify-center gap-2">
                <span className="block w-4 text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="currentColor">
                        <path
                            d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                            data-name="Left"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        />
                    </svg>
                </span>
                <a
                    className="flex cursor-pointer justify-center font-semibold text-blue-900"
                    href="/login"
                >
                    Back to log in
                </a>
            </div>
        </div>
    );
}

export default ForgetPasswordForm;