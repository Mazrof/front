import Aouth from "@/components/Auth/Aouth";
import LoginForm from "@/components/Auth/LoginForm";
export default async function Login() {
    return (
        <LoginForm>
            <Aouth operation="Log In" />
        </LoginForm>
    );
}
