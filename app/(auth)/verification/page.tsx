"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useOTPContext } from "@/store/OTPContext";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
    const { OTPContext, email, cleanOTPContext } = useOTPContext();
    const router = useRouter();
    const OTPDigits = Array.from({ length: 6 }, (_, index) => (
        <InputOTPSlot
            key={index}
            index={index}
            className="mx-1 h-8 w-8 rounded-lg border border-gray-300 bg-white text-center text-2xl font-semibold shadow transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:h-12 md:w-12"
        />
    ));

    const handleVerifyOTP = () => {
        if (OTPContext === "verifyAccount") {
            // Verify account
        } else if (OTPContext === "resetPassword") {
            router.push("/reset-password");
        }
        cleanOTPContext();
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

                    Enter the verification code we sent to {email}
                </p>

                <section className="my-6 flex flex-col items-center">
                    <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Type the 6-digit security code
                    </h3>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup className="flex justify-center space-x-2">
                            {OTPDigits}
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Didn&apos;t receive the OTP?
                        <Button
                            variant="link"
                            className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Resend OTP
                        </Button>
                    </p>
                </section>
                <Button
                    className="mt-6 w-full rounded-full bg-[#1c4b82] py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-[#285182]"
                    onClick={handleVerifyOTP}
                >
                    Verify
                </Button>
            </div>
        </main>
    );
}
