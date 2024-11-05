import Oauth from "@/components/Auth/Oauth";
import LoginForm from "@/components/Auth/LoginForm";
export default async function Login() {
    return (
        <LoginForm>
            <Oauth operation="Log In" />
        </LoginForm>
    );
}
