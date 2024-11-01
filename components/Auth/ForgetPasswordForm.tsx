"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useOTPContext } from "@/store/OTPContext";
export default function EmailInputForm() {
    const { setOTPContext } = useOTPContext();
    const emailSchema = z.object({
        email: z.string().email("Please enter a valid email address"),
    });

    type EmailSchema = z.infer<typeof emailSchema>;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailSchema>({
        resolver: zodResolver(emailSchema),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
        // here comes the link we sent to backend.
        setOTPContext("resetPassword", data.email);
        router.push("/verification");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="login-input-field"
                />
                {errors.email && (
                    <div className="m-1 text-sm text-red-700">{errors.email.message}</div>
                )}
            </div>
            <button className="auth-buttons my-4 bg-blue-950 text-white" type="submit">
                Reset password
            </button>
        </form>
    );
}
