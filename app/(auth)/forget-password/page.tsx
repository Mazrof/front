import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import Image from "next/image";
export default function ForgetPasswordPage() {
    return (
        <main className="flex h-3/4 w-1/2 flex-col items-center justify-around pt-3 text-blue-900">
            <div className="flex max-w-[300px] flex-col items-center rounded-lg p-8 dark:bg-gray-900 md:max-w-screen-md">
                <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="rounded-full"
                />

                <h2 className="my-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    Forget Password
                </h2>
                <section className="mt-2">
                    <ForgetPasswordForm />
                </section>
            </div>
        </main>
    );
}
