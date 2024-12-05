"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getUserId } from "@/services/Settings";
import { useRouter, useSearchParams } from "next/navigation";
import { changePassword } from "@/services/User";
import { failResponse, genericResponse, successResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";

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
    type ResetPasswordFormData = z.infer<typeof passwordSchema>;
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });
    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message,
        });
    };

    const searchParams = useSearchParams();
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log(searchParams);
    const onSubmit: SubmitHandler<ResetPasswordFormData> = async ({
        password,
        confirmPassword,
    }) => {
        const [token, userId] = [searchParams.get("token") || "", searchParams.get("id") || ""]; //fallback to avoid null type
        const body = {
            token,
            userId: Number(userId),
            newPassword: password,
        };
        const response: genericResponse<{ message: string }> = await changePassword(body);
        if (response.status === "fail") {
            const failApiResponse = response as failResponse;
            setErrorRoot(failApiResponse.message);
        } else {
            const successApiResponse = response as successResponse<{ message: string }>;
            toast({
                title: "You have Now New password ",
                description: successApiResponse.data.message,
                duration: 1500,
            });
            setTimeout(() => {
                router.push("/login");
            }, 1750);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate role="form">
            <div>
                <label htmlFor="Password">Password</label>
                <input
                    id="Password"
                    type="password"
                    {...register("password")}
                    className="input-field"
                />
                {errors.password && (
                    <p className="m-1 text-sm text-red-700">{errors.password.message}</p>
                )}
            </div>

            <div className="mt-4">
                <label htmlFor="Confirm Password">Confirm Password</label>
                <input
                    id="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    className="input-field"
                />
                {errors.confirmPassword && (
                    <p className="m-1 text-sm text-red-700">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button className="auth-buttons my-4 bg-blue-950 text-white" type="submit">
                Update Password
            </button>
            {errors.root && (
                <div className="mx-auto mt-4 text-sm text-red-700" data-testid="root-error">
                    {errors.root.message}
                </div>
            )}
        </form>
    );
}
