"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import InputField from "./InputField";
import logo from "../../public/images/logo.jpg";
// import { PhoneInput } from "./PhoneNumber";
import { SignupWithEmail } from "@/services/User";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { failResponse, genericResponse } from "@/types/api";
import { UserToken } from "@/types/user";

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
        email: z.string().email(),
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
    const {
        // control,
        register,
        handleSubmit,
        setError,
        formState: { errors },
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

    const firstError = Object.entries(errors)[0];
    console.log(firstError);
    const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
        console.log(data);
        const response: genericResponse<UserToken> = await SignupWithEmail(
            data.name,
            data.username,
            // data.phoneNumber,
            data.email.trim().toLowerCase(),
            data.password
        );
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            setErrorRoot(failApiResponse.message);
        } else {
            router.push("/");
        }
    };
    const handleLogin = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        router.push("/login");
    };
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
                    dataTest="signup-name"
                />

                {/* Username Input */}
                <InputField
                    id="username"
                    type="text"
                    register={register}
                    error={firstError && firstError[0] === "username" && errors.username?.message}
                    dataTest="signup-username"
                />
                {/* email*/}
                <InputField
                    id="email"
                    type="text"
                    register={register}
                    error={
                        firstError &&
                        firstError[0] !== "name" &&
                        firstError[0] !== "username" &&
                        errors.email &&
                        errors.email?.message
                    }
                    dataTest="signup-email"
                />

                {/* <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{
                        required: "Phone number is required",
                        validate: (value) =>
                            (value?.length > 0 && value?.length < 12) ||
                            "Please enter a valid phone number",
                    }}
                    render={({ field }) => (
                        <PhoneInput
                            id="PhoneNumber"
                            {...field}
                            error={
                                firstError &&
                                firstError[0] === "phoneNumber" &&
                                !errors.email &&
                                errors.phoneNumber?.message
                            }
                        />
                    )}
                /> */}

                {/* Password Input */}
                <InputField
                    id="password"
                    type="password"
                    register={register}
                    error={
                        firstError &&
                        firstError[0] === "password" &&
                        !errors.email &&
                        errors.password?.message
                    }
                    dataTest="signup-password"
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
                    dataTest="signup-repeatPassword"
                />

                {/* Submit Button */}
                <button type="submit" className="btn" data-test="signup-submit">
                    Create Account
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
                        data-test="signup-loginButton"
                    >
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
