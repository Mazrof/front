import Aouth from "@/components/Auth/Aouth";
import LoginForm from "@/components/Auth/LoginForm";
import Image from "next/image";
export default async function Login() {
    return (
        <LoginForm>
            <Aouth operation="Log In" />
        </LoginForm>
    );
}
