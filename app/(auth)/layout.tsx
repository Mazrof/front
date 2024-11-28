export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-background flex min-h-screen flex-col items-center justify-center gap-4 p-3 align-middle text-blue-900">
            <div className="flex w-1/2 flex-col items-center justify-evenly gap-4">
                <h1 className="text-6xl">MAZROF</h1>
                <p className="text-center text-xl text-blue-900">
                    Your world is just one chat away!
                </p>
            </div>
            <div className="flex h-3/4 w-1/2 flex-col items-center justify-around rounded-2xl border-2 bg-white pt-3 text-blue-900 shadow-lg lg:w-1/3">
                {children}
            </div>
        </div>
    );
}
