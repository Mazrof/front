// pages/edit-profile.tsx
"use client";
import Image from "next/image";
import InputField from "./InputField";
import logo from "../../public/images/logo.jpg";
import { useState } from "react";

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
                <InputField label="Name" type="text" placeholder="Name" />
                {/* <phone number /> */}
                <PhoneNumberInput />
                <InputField label="Email" type="email" placeholder="example@example.com" />

                {/* Password Input */}
                <InputField label="Password" type="password" placeholder="Enter Password" />
                {/* Repeat Password Input */}
                <InputField label="Repeat Password" type="password" placeholder="Repeat Password" />
                {/* Create Account Button */}
                <button type="submit" className="btn">
                    Create Account
                </button>
                {/* Create an Account Button */}
            </form>
            <div className="mt-4 flex justify-center">
                <p>
                    Do you have an account?
                    <a className="cursor-pointer font-semibold text-blue-700" href="/login">
                        Log in
                    </a>
                </p>
            </div>
            {/* Social Login Options */}
            {children}
        </div>
    );
}

function PhoneNumberInput() {
    const [countryCode, setCountryCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <div className="flex items-center rounded-md border p-2 shadow-sm">
                <select
                    className="bg-transparent pr-2 text-gray-700 focus:outline-none"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                >
                    <option value="91">+91</option>
                    <option value="1">+1</option>
                    <option value="44">+44</option>
                    {/* Add more country codes here as needed */}
                </select>
                <span className="mx-2">|</span>
                <input
                    type="text"
                    placeholder="9876543210"
                    className="flex-1 focus:outline-none"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
        </div>
    );
}

export default SignUpForm;
