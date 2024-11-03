export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="auth-background flex min-h-screen flex-col items-center justify-center gap-4 p-3 align-middle text-blue-900">
            <div className="flex flex-col items-center justify-evenly gap-4">
                <h1 className="text-6xl">MAZROF</h1>
                <p className="text-center text-xl text-blue-900">
                    Your world is just one chat away!
                </p>
            </div>
            {children}
        </div>
    );
}
