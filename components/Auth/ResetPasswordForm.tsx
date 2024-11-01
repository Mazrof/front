"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../schemas/passwordSchema";
import { z } from "zod";

type ResetPasswordFormData = z.infer<typeof passwordSchema>;

export default function ResetPasswordForm() {
    const passwordSchema = z
        .object({
            password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"], // Error path for confirm password field
        });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
        // Here you can send the data to the server and reset your password
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className="login-input-field"
                />
                {errors.password && (
                    <p className="m-1 text-sm text-red-700">{errors.password.message}</p>
                )}
            </div>

            <div className="mt-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="login-input-field"
                />
                {errors.confirmPassword && (
                    <p className="m-1 text-sm text-red-700">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button className="auth-buttons my-4 bg-blue-950 text-white" type="submit">
                Update Password
            </button>
        </form>
    );
}
