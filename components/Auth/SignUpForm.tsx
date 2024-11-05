"use client";
import Image from "next/image";
import InputField from "./InputField";
import logo from "../../public/images/logo.jpg";
import { useState } from "react";
import { PhoneInput } from "./PhoneNumber";

function SignUpForm({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-blue-100">
                    <Image className="rounded-full" src={logo} alt="logo" />
                </div>
            </div>
            <div className="mb-6 flex justify-center">
                <h1 className="text-center text-3xl text-blue-800">SIGN UP</h1>
            </div>
            {/* Sign UP Form */}
            <form className="flex flex-col space-y-4">
                {/*Name Input */}
                <InputField id="Name" type="text" placeholder="Name" />
                {/* <phone number /> */}
                <PhoneInput />
                <InputField id="Email" type="email" placeholder="example@example.com" />

                {/* Password Input */}
                <InputField id="Password" type="password" placeholder="Enter Password" />
                {/* Repeat Password Input */}
                <InputField id="Repeat Password" type="password" placeholder="Repeat Password" />
                {/* Create Account Button */}
                <button type="submit" className="btn">
                    Create Account
                </button>
                {/* Create an Account Button */}
            </form>
            <div className="mt-4 flex justify-center">
                <p>
                    Do you have an account?
                    <a className="cursor-pointer px-1 font-semibold text-blue-700" href="/login">
                        Log in
                    </a>
                </p>
            </div>
            {/* Social Login Options */}
            {children}
        </div>
    );
}

export default SignUpForm;
