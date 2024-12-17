export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-background flex min-h-screen w-full flex-col items-center justify-center gap-4 p-3 align-middle text-blue-900">
            <div className="flex flex-col items-center justify-evenly gap-4 md:w-1/2">
                <h1 className="text-6xl">MAZROF</h1>
                <p className="text-center text-xl text-blue-900">
                    Your world is just one chat away!
                </p>
            </div>
            <div className="flex h-3/4 w-3/4 flex-col items-center justify-around rounded-2xl border-2 bg-white pt-3 text-blue-900 shadow-lg md:w-1/2 lg:w-1/3">
                {children}
            </div>
        </div>
    );
}
