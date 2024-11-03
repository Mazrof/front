"use client";

import { useRouter } from "next/navigation";
import logo from "../../public/images/logo.jpg";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginWithEmail } from "@/services/User";
import { UserToken } from "@/types/user";
import Image from "next/image";
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
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
    const setErrorRoot = () => {
        setError("root", {
            type: "manual",
            message: "This user is not founded",
        });
    };
    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        const token: UserToken = await LoginWithEmail(data.email, data.password);
        console.log(token);
        if (token) router.push("/");
        else setErrorRoot();
    };
    const handleForgetPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push("/forgetpassword");
    };
    return (
        <div className="mt-6 w-full max-w-md rounded-2xl bg-white p-8">
            {/*logo */}
            <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-blue-100">
                    <Image className="rounded-full" src={logo} alt="logo" />
                </div>
            </div>
            <div className="mb-6 flex justify-center">
                <h1 className="text-center text-3xl text-blue-800">LOG IN</h1>
            </div>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Email address or phone number </label>
                    <input type="text" {...register("email")} className="input-field" />
                    {errors.email && (
                        <div className="text-sm text-red-900">{errors.email.message}</div>
                    )}
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <input type="password" {...register("password")} className="input-field" />
                    {errors.password && (
                        <div className="text-sm text-red-900">{errors.password.message}</div>
                    )}
                    {errors.root && (
                        <div className="text-sm text-red-900">{errors.root.message}</div>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(event) => handleForgetPassword(event)}
                    >
                        Forget Password?
                    </button>
                </div>
                <div>
                    <button className="btn" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
            <div className="mt-4 flex justify-center">
                <p>
                    Do not have an account?
                    <a className="cursor-pointer font-semibold text-blue-700" href="/signup">
                        Sign Up
                    </a>
                </p>
            </div>
            <div className={`${isSubmitting && "invisible"} w-full`}>{children}</div>
        </div>
    );
}

export default LoginForm;
