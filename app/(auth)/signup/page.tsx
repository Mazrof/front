import SignUpForm from "@/components/Auth/SignUpForm";
import Aouth from "@/components/Auth/Aouth";
export default async function Login() {
    return (
        <SignUpForm>
            <Aouth operation="Sign Up" />
        </SignUpForm>
    );
}
