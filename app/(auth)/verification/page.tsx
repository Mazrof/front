"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useOTPContext } from "@/store/OTPContext";
import { useRouter } from "next/navigation";
import { SendEmailCode, VerifyEmailCode } from "@/services/User";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { failResponse, genericResponse } from "@/types/api";
import { WhoAmI } from "@/types/user";

export default function VerificationPage() {
    const [otp, setOTP] = useState<string>(""); // Ensure otp is always a string
    const handleUpdateOTP = (newOTP: string) => {
        setOTP(newOTP);
    };

    const { OTPContext, email, cleanOTPContext } = useOTPContext();
    const router = useRouter();
    const {
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const OTPDigits = Array.from({ length: 6 }, (_, index) => (
        <InputOTPSlot
            key={index}
            index={index}
            onUpdate={handleUpdateOTP}
            className="mx-1 h-8 w-8 rounded-lg border border-gray-300 bg-white text-center text-2xl font-semibold shadow transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:h-12 md:w-12"
        />
    ));

    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message: message,
        });
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length < 6) {
            setErrorRoot("OTP must be 6 digits.");
            return;
        }

        try {
            const response: genericResponse<WhoAmI> = await VerifyEmailCode(email, otp);

            if (response.status === "fail") {
                const failApiResponse = response as failResponse;
                setErrorRoot(failApiResponse.message);
            } else {
                cleanOTPContext();
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            setErrorRoot("Something went wrong. Please try again.");
        }
    };

    const handleResendOTP = () => {
        if (OTPContext === "verifyAccount") {
            SendEmailCode(email);
        } else if (OTPContext === "resetPassword") {
            console.log("Resending OTP...");
            // Additional logic for resetPassword, if needed
        }
    };

    return (
        <main className="flex items-center justify-center">
            <div className="flex max-w-[300px] flex-col items-center rounded-lg p-8 dark:bg-gray-900 md:max-w-screen-md">
                <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="rounded-full"
                />

                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                    OTP Verification
                </h2>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                    Enter the verification code we sent to{" "}
                    <span className="font-bold text-black">{email}</span>
                </p>

                <section className="my-6 flex flex-col items-center">
                    <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Type the 6-digit security code
                    </h3>
                    <InputOTP maxLength={6} id="otp-input">
                        <InputOTPGroup className="flex justify-center space-x-2">
                            {OTPDigits}
                        </InputOTPGroup>
                    </InputOTP>
                    {errors.root && (
                        <div className="mx-auto mt-4 text-sm text-red-700" data-testid="root-error">
                            {errors.root.message}
                        </div>
                    )}

                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Didn&apos;t receive the OTP?{" "}
                        <Button
                            variant="link"
                            className="text-blue-600 hover:underline dark:text-blue-400"
                            onClick={handleResendOTP}
                        >
                            Resend OTP
                        </Button>
                    </p>
                </section>
                <Button
                    className="auth-buttons w-2/3 bg-blue-900 text-white"
                    onClick={handleVerifyOTP}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Verify"}
                </Button>
            </div>
        </main>
    );
}
