import FormLoading from "@/components/Auth/FormLoading";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import Image from "next/image";
import { Suspense } from "react";
export default function ResetPasswordPage() {
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

                <h2 className="mb-5 text-3xl font-semibold text-blue-800 dark:text-white">
                    Reset Password
                </h2>
                <Suspense fallback={<FormLoading />}>
                    <section className="mt-2 w-3/4">
                        <ResetPasswordForm />
                    </section>
                </Suspense>
            </div>
        </main>
    );
}
