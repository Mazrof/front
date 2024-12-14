export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-background flex min-h-lvh flex-col items-center justify-center gap-4 p-3 align-middle text-blue-900">
            <div className="l:w-1/2 xxl:w-1/4 sm:w-3/4 md:w-2/3 xl:w-1/3">
                <div className="mb-3 flex w-full flex-col items-center justify-evenly">
                    <h1 className="text-6xl">MAZROF</h1>
                    <p className="text-center text-xl text-blue-900">
                        Your world is just one chat away!
                    </p>
                </div>
                <div className="flex w-full flex-col items-center justify-around rounded-2xl border-2 bg-white pt-3 text-blue-900 shadow-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
