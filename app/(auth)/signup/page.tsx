import SignUpForm from "@/components/Auth/SignUpForm";
import Oauth from "@/components/Auth/Oauth";
export default async function signup() {
    return (
        <SignUpForm>
            <Oauth operation="Sign up" />
        </SignUpForm>
    );
}
