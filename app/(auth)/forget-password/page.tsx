import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import Image from "next/image";
export default function ForgetPasswordPage() {
    return (
        <main className="flex h-3/4 w-1/2 flex-col items-center justify-around rounded-2xl border-2 bg-white pt-3 text-blue-900 shadow-lg lg:w-1/3">
            <div className="flex max-w-[300px] flex-col items-center rounded-lg p-8 dark:bg-gray-900 md:max-w-screen-md">
                <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="rounded-full"
                />

                <h2 className="mb-5 text-3xl font-semibold text-gray-800 dark:text-white">
                    Forget Password
                </h2>
                <section className="mt-2 w-3/4">
                    <ForgetPasswordForm />
                </section>
            </div>
        </main>
    );
}
