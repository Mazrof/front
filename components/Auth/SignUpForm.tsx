"use client";
import React, { useState } from "react";
import Image from "next/image";
import InputField from "./InputField";
import logo from "../../public/images/logo.jpg";
import { PhoneInput } from "./PhoneNumber";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for form validation
const signUpSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Name is required" })
            .min(3, { message: "Name must have at least 3 characters" })
            .max(50, { message: "Name cannot be longer than 50 characters" })
            .regex(/^[a-zA-Z0-9\s]+$/, {
                message: "Name can only contain letters, numbers, and spaces",
            })
            .regex(/[a-zA-Z]/, {
                message: "Name must contain at least one letter",
            }),
        username: z
            .string()
            .min(1, { message: "Username is required" })
            .min(3, { message: "Username must have at least 3 characters" })
            .max(30, { message: "Username cannot be longer than 30 characters" })
            .regex(/^[a-zA-Z0-9_]+$/, {
                message:
                    "Username can only contain english alphanumeric characters and underscores",
            }),
        email: z
            .string()
            .refine((email) => email.includes("@"), {
                message: "Email must contain '@'.",
            })
            .refine((email) => email.includes(".com"), {
                message: "Email must contain '.com'.",
            })
            .refine((email) => !email.includes("gamil"), {
                message: "Email must not contain 'gamil'.",
            })
            .refine(
                (email) => {
                    const domainPart = email.split("@")[1]?.split(".com")[0];
                    return domainPart && domainPart.length > 0; // domain part should exist and not be empty
                },
                {
                    message: "Email must contain a valid domain between '@' and '.com'.",
                }
            ),
        /*phoneNumber: z
            .string()
            .min(10, { message: "Name is required" })
            .regex(/^\d{10}$/, { message: "Phone number must be a 10-digit number" }),*/

        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/\d/, { message: "Password must contain at least one number" })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Password must contain at least one special character",
            }),
        repeatPassword: z
            .string()
            .min(8, { message: "Repeat password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords do not match",
        path: ["repeatPassword"], // Set the path of the error });
    });

// Infer the TypeScript types from the Zod schema
type SignUpFormFields = z.infer<typeof signUpSchema>;

export function SignUpForm({ children }: { children: React.ReactNode }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormFields>({
        resolver: zodResolver(signUpSchema),
        shouldFocusError: true,
    });

    const onSubmit = (data: SignUpFormFields) => {
        console.log("Form Data Submitted:", data);
        // Handle form submission (e.g., API call)
    };
    const firstError = Object.entries(errors)[0];
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                {/* Name Input */}
                <InputField
                    id="name"
                    type="text"
                    register={register}
                    error={firstError && firstError[0] === "name" && errors.name?.message}
                />

                {/* Username Input */}
                <InputField
                    id="username"
                    type="text"
                    register={register}
                    error={firstError && firstError[0] === "username" && errors.username?.message}
                />
                {/* email*/}
                <InputField
                    id="email"
                    type="text"
                    register={register}
                    error={firstError && firstError[0] === "email" && errors.email?.message}
                />

                {/* Phone Number Input */}
                <PhoneInput
                    id="PhoneNumber"
                    register={register}
                    error={
                        firstError && firstError[0] === "phoneNumber" && errors.phoneNumber?.message
                    }
                />

                {/* Password Input */}
                <InputField
                    id="password"
                    type="password"
                    register={register}
                    error={firstError && firstError[0] === "password" && errors.password?.message}
                />

                {/* Repeat Password Input */}
                <InputField
                    id="repeatPassword"
                    type="password"
                    register={register}
                    error={
                        firstError &&
                        firstError[0] === "repeatPassword" &&
                        errors.repeatPassword?.message
                    }
                />

                {/* Submit Button */}
                <button type="submit" className="btn">
                    Create Account
                </button>
            </form>

            {/* Log in link */}
            <div className="mt-4 flex justify-center">
                <p>
                    Do you have an account?{" "}
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
