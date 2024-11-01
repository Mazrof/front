"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginWithEmail } from "@/services/User";
import { UserToken } from "@/types/user";
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
            email: "example@example.com",
            password: "",
        },
        resolver: zodResolver(LoginSchema),
    });
    const setErrorRoot = () => {
        setError("root", {
            type: "manual",
            message: "This user is founded",
        });
    };
    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        const token: UserToken = await LoginWithEmail(data.email, data.password);
        console.log(token);
        if (token) router.push("/");
        else setErrorRoot();
    };
    const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push("/signup");
    };
    const handleForgetPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push("/forget");
    };
    return (
        <div className="flex h-full flex-col items-center justify-between">
            <form
                className="flex h-full flex-col justify-between gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="login-field">
                    <label>Email</label>
                    <input type="text" {...register("email")} className="login-input-field" />
                    {errors.email && (
                        <div className="text-sm text-red-700">{errors.email.message}</div>
                    )}
                </div>
                <div className="login-field">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="login-input-field"
                    />
                    {errors.password && (
                        <div className="text-sm text-red-700">{errors.password.message}</div>
                    )}
                    {errors.root && (
                        <div className="text-sm text-red-700">{errors.root.message}</div>
                    )}
                </div>
                <div>
                    <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(event) => handleForgetPassword(event)}
                    >
                        Forget Password
                    </button>
                </div>
                <div>
                    <button
                        className="auth-buttons my-4 bg-blue-950 text-white"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Loading..." : "Login"}
                    </button>
                    <div>
                        <span className="text-black">Don’t you have an account? </span> 
                    <button
                        className="text-blue-900 text-lg"
                        disabled={isSubmitting}
                        onClick={(event) => handleSignUp(event)}
                    >
    Signup
                        </button>
                    </div>
                </div>
            </form>
            <div className={`${isSubmitting && "invisible"} w-full`}>{children}</div>
        </div>
    );
}

export default LoginForm;
