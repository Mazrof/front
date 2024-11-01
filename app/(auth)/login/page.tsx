import Aouth from "@/components/Auth/Aouth";
import LoginForm from "@/components/Auth/LoginForm";
export default async function Login() {
    return (
        <div className="flex h-[600px] flex-col items-center justify-between pb-5">
            <h1 className="bold my-6 text-3xl text-blue-900">LOGIN</h1>
            <LoginForm>
                <Aouth />
            </LoginForm>
        </div>
    );
}
