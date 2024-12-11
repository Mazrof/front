"use client";
import { GitHubIcon, GoogleIcon } from "@/utils/icons";
import { OAuthProps } from "../../types/auth";
function Oauth({ operation }: OAuthProps) {
    return (
        <div>
            <div className="mt-6 space-y-3">
                <button className="auth-buttons gap-1" data-test="google-button">
                    <GoogleIcon />
                    <a href={`${process.env.NEXT_SERVER_IP}api/v1/auth/google`}>
                        {operation} in with Google
                    </a>
                </button>
                <button className="auth-buttons gap-1" data-test="github-button">
                    <GitHubIcon />
                    <a href={`${process.env.NEXT_SERVER_IP}api/v1/auth/github`}>
                        {operation} in with Github
                    </a>
                </button>
            </div>
        </div>
    );
}
export default Oauth;
