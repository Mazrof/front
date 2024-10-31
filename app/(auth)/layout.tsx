export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-background flex h-screen w-full flex-col items-center justify-around p-7 align-middle text-blue-900">
            <div className="flex w-1/2 flex-col items-center justify-between gap-3 lg:w-1/3">
                <h1 className="text-6xl">MAZROF</h1>
                <p className="text-xl text-blue-900">Your world is just one chat away!</p>
            </div>
            <div className="flex h-3/4 w-1/2 flex-col items-center justify-around rounded-2xl border-2 text-blue-900 p-9 lg:w-1/3 bg-white shadow-lg">
                {children}
            </div>
        </div>
    );
}
