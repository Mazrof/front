"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import InputField from "./InputField";
import logo from "../../public/images/logo.jpg";
import { PhoneInput } from "./PhoneNumber";
import {
    SignupWithEmail,
    SendEmailCode /*, Recaptcha   don't  forget to use it*/,
} from "@/services/User";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { failResponse, genericResponse } from "@/types/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useOTPContext } from "@/store/OTPContext";
import ReCAPTCHA from "react-google-recaptcha";

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
            .regex(/^[a-z0-9_]+$/, {
                message:
                    "Username can only contain english small alphanumeric characters, underscores and numbers",
            }),
        email: z.string().email({ message: "Email is invalid" }),
        phoneNumber: z.string().refine(
            (value) => {
                const phoneNumber = parsePhoneNumberFromString(value); // No country specified
                return phoneNumber && phoneNumber.isValid(); // Validates internationally
            },
            {
                message: "Invalid phone number",
            }
        ),

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
    const router = useRouter();
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const { setOTPContext } = useOTPContext();
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormFields>({
        resolver: zodResolver(signUpSchema),
        shouldFocusError: true,
    });
    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message: message,
        });
    };
    const handleCaptchaChange = (token: string | null) => {
        console.log("Captcha token:", token);
        setRecaptchaToken(token); // Verify if the CAPTCHA is successfully completed
    };
    const firstError = Object.entries(errors)[0];
    const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
        if (!recaptchaToken) {
            setErrorRoot("Please complete the CAPTCHA!");
        } else {
            // const response: genericResponse<UserToken> = await Recaptcha(recaptchaToken);
            const response = { status: "success" };
            if (response.status === "fail") {
                const failApiResponse = response as failResponse;
                setErrorRoot(failApiResponse.message);
            } else {
                const response: genericResponse<string> = await SignupWithEmail(
                    data.name,
                    data.username,
                    data.phoneNumber,
                    data.email.trim().toLowerCase(),
                    data.password
                );
                if (response.status === "fail") {
                    const failApiResponse = response as failResponse;
                    setErrorRoot(failApiResponse.message);
                } else {
                    SendEmailCode(data.email);
                    setOTPContext("verifyAccount", data.email);
                    router.push("/verification");
                }
            }
        }
    };
    const handleLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.push("/login");
    };
    useEffect(() => {
        // Focus on input after render
        document.getElementById("name")?.focus();
    }, []);
    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8">
            {/* Logo */}
            <div className="mb-3 flex cursor-pointer items-center justify-center">
                <Image className="h-24 w-24 rounded-full" src={logo} alt="logo" />
            </div>
            <div className="mb-6 flex justify-center">
                <h1 className="text-center text-3xl text-blue-800">SIGN UP</h1>
            </div>

            {/* Sign UP Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className="flex flex-col space-y-4"
            >
                {/* Name Input */}
                <InputField
                    id="name"
                    type="text"
                    register={register}
                    testid="name"
                    error={firstError && firstError[0] === "name" && errors.name?.message}
                />

                {/* Username Input */}
                <InputField
                    id="username"
                    type="text"
                    register={register}
                    testid="username"
                    error={firstError && firstError[0] === "username" && errors.username?.message}
                />
                {/* email*/}
                <InputField
                    id="email"
                    type="text"
                    register={register}
                    testid="email"
                    error={
                        firstError &&
                        firstError[0] !== "name" &&
                        firstError[0] !== "username" &&
                        errors.email &&
                        errors.email?.message
                    }
                />

                <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                        required: "Phone number is required",
                        validate: (value) =>
                            (value?.length > 0 && value?.length < 12) ||
                            "Please enter a valid phone number",
                    }}
                    render={({ field }) => {
                        return (
                            <PhoneInput
                                data-testid="PhoneNumber"
                                id="PhoneNumber"
                                {...field}
                                error={
                                    firstError &&
                                    firstError[0] === "phoneNumber" &&
                                    !errors.email &&
                                    errors.phoneNumber?.message
                                }
                            />
                        );
                    }}
                />

                {/* Password Input */}
                <InputField
                    id="password"
                    type="password"
                    register={register}
                    testid="password"
                    error={
                        firstError &&
                        firstError[0] === "password" &&
                        !errors.email &&
                        errors.password?.message
                    }
                />

                {/* Repeat Password Input */}
                <InputField
                    id="repeatPassword"
                    type="password"
                    register={register}
                    testid="repeatPassword"
                    error={
                        firstError &&
                        firstError[0] === "repeatPassword" &&
                        errors.repeatPassword?.message
                    }
                />
                <div className="mt-4">
                    <ReCAPTCHA
                        data-testid="Recaptcha"
                        sitekey="6LcM_ZoqAAAAAJ3-KONvHtQpiIYC919l4oTz6qbE"
                        onChange={handleCaptchaChange}
                    />
                </div>
                {errors.root && (
                    <div
                        className="mx-auto mt-4 text-sm font-semibold text-red-700"
                        data-testid="root-error"
                    >
                        {errors.root.message}
                    </div>
                )}
                {/* Submit Button */}
                <button data-testid="submit" type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create account"}
                </button>
            </form>

            {/* Log in link */}
            <div className="mt-4 flex justify-center">
                <p>
                    Do you have an account?{" "}
                    <a
                        className="cursor-pointer px-1 font-semibold text-blue-700"
                        href="#"
                        onClick={handleLogin}
                    >
                        Log in
                    </a>
                </p>
            </div>

            {/* Social signup Options */}
            <div className={`${isSubmitting && "invisible"} w-full`}>{children}</div>
        </div>
    );
}

export default SignUpForm;
