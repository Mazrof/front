"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginWithEmail } from "@/services/User";
import Image from "next/image";
import { UserToken } from "@/types/user";
import logo from "../../public/images/logo.jpg";
import { failResponse, genericResponse } from "@/types/api";
const LoginSchema = z.object({
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
});

type LoginFormFields = z.infer<typeof LoginSchema>;

function LoginForm({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormFields>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema),
    });
    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message: message,
        });
    };
    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        const response: genericResponse<UserToken> = await LoginWithEmail(
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
    const handleForgetPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push("/forget-password");
    };
    const handleSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push("/signup");
    };
    return (
        <div className="flex h-full flex-col items-center justify-between p-4">
            <Image src={logo} alt="Logo" width={70} height={70} className="rounded-full" />
            <h1 className="bold my-6 text-3xl text-blue-900">LOGIN</h1>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-field">
                    <label>Email</label>
                    <input
                        type="text"
                        {...register("email")}
                        className="input-field"
                        data-testid="email"
                        data-test="login-email"
                    />
                    {errors.email && (
                        <div
                            className="text-sm text-red-900"
                            data-testid="email-error"
                            data-test="login-email-error"
                        >
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="login-field">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="input-field"
                        data-testid="password"
                        data-test="login-password"
                    />
                    {errors.password && (
                        <div
                            className="text-sm text-red-900"
                            data-testid="password-error"
                            data-test="login-password-error"
                        >
                            {errors.password.message}
                        </div>
                    )}
                    {errors.root && (
                        <div
                            className="mx-auto mt-4 text-sm text-red-700"
                            data-testid="root-error"
                            data-test="login-error"
                        >
                            {errors.root.message}
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(event) => handleForgetPassword(event)}
                        className="my-1"
                    >
                        Forget Password?
                    </button>
                </div>
                <div>
                    <button
                        className="btn"
                        type="submit"
                        disabled={isSubmitting}
                        data-test="login-submit"
                    >
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
            <div className="mt-4 flex justify-center">
                <p>
                    Do not have an account?
                    <button
                        className="cursor-pointer p-1 font-semibold text-blue-700"
                        onClick={(event) => handleSignup(event)}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
            <div className={`${isSubmitting && "invisible"} w-full`}>{children}</div>
        </div>
    );
}

export default LoginForm;
