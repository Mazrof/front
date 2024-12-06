import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import Image from "next/image";
import logo from "@/public/images/logo.jpg";
export default function ForgetPasswordPage() {
    return (
        <main className="w-full pt-3 text-blue-900 lg:w-2/3">
            <div className="flex w-full flex-col items-center rounded-lg p-4 dark:bg-gray-900">
                <Image src={logo} alt="Logo" width={70} height={70} className="rounded-full" />

                <h2 className="my-4 text-2xl font-semibold text-blue-800 dark:text-white">
                    Forget Password
                </h2>
                <section className="mt-2 w-full lg:w-2/3">
                    <ForgetPasswordForm />
                </section>
            </div>
        </main>
    );
}
