import SignUpForm from "@/components/Auth/SignUpForm";
import Oauth from "@/components/Auth/Oauth";
export default async function Login() {
    return (
        <SignUpForm>
            <Oauth operation="Sign up" />
        </SignUpForm>
    );
}
