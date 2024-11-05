import { signIn } from "@/auth";
import { getFormAction } from "@/utils/aouth";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { operation } from "../../types/auth";
async function Aouth({ operation }: { operation: operation }) {

    async function handleAouth(formData: FormData) {
        "use server";
        const actionString: string = getFormAction(formData);
        await signIn(actionString);
    }
    return (
        <form action={handleAouth}>
            <div className="mt-6 space-y-3">
                <button type="submit" name="action" value="google" className="auth-buttons">
                    <FaGoogle className="mr-2" />
                    {`${operation} with Google`}
                </button>
                <button type="submit" name="action" value="github" className="auth-buttons">
                    <FaGithub className="mr-2" />
                    {`${operation} with GitHub`}
                </button>
            </div>
        </form>
    );
}
export default Aouth;
