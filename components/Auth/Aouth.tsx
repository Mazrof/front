import { signIn } from "@/auth";
import { GitHubIcon, GoogleIcon } from "@/utils/icons";
import { getFormAction } from "@/utils/oAuth";
import { OAuthProps } from "@/types/auth";
async function Aouth({ operation }: OAuthProps) {
    async function handleAouth(formData: FormData) {
        "use server";
        const actionString: string = getFormAction(formData);
        await signIn(actionString);
    }
    return (
        <form
            className="my-5 flex w-full flex-col items-center justify-around"
            action={handleAouth}
        >
            <div className="flex w-full flex-col items-center justify-evenly gap-3">
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
export default Aouth;
