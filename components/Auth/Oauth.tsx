import { signIn } from "@/auth";
import { GitHubIcon, GoogleIcon } from "@/utils/icons";
import { getFormAction } from "@/utils/Oauth";
import { OAuthProps } from "../../types/auth";
async function Oauth({ operation }: OAuthProps) {
    async function handleOauth(formData: FormData) {
        "use server";
        const actionString: string = getFormAction(formData);
        await signIn(actionString);
    }
    return (
        <form action={handleOauth}>
            <div className="mt-6 space-y-3">
                <button type="submit" name="action" value="google" className="auth-buttons">
                    <GoogleIcon />
                    {operation} with Google
                </button>
                <button type="submit" name="action" value="github" className="auth-buttons">
                    <GitHubIcon />
                    {operation} with GitHub
                </button>
            </div>
        </form>
    );
}
export default Oauth;
