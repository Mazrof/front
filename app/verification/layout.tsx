import { PropsWithChildren } from "react";

type VerificationLayoutProps = {} & PropsWithChildren;
export default function VerificationLayout({ children }: VerificationLayoutProps) {
    return (
        <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {children}
        </div>
    );
}
