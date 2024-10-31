import { signIn } from "@/auth";

export default async function Login() {
    return (
        <form
            className="flex h-96 flex-col items-center justify-around "
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >   
            <h1 className="bold text-3xl  text-blue-900">LOGIN</h1>
            <div className="flex flex-col items-center justify-evenly gap-3">
                <button type="submit" name="action" value="google" className="auth-buttons">
                    Login with Google
                </button>
                <button type="submit" name="action" value="github" className="auth-buttons">
                    Login with GitHub
                </button>
            </div>
        </form>
    );
}
