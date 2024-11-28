"use client";
import { GitHubIcon, GoogleIcon } from "@/utils/icons";
import { OAuthProps } from "../../types/auth";
function Oauth({ operation }: OAuthProps) {
    return (
        <div>
            <div className="mt-6 space-y-3">
                <button className="auth-buttons">
                    <GoogleIcon />
                    <a href="http://localhost:3000/api/v1/auth/google">
                        {operation} in with Google
                    </a>
                </button>
                <button className="auth-buttons">
                    <GitHubIcon />
                    <a href="http://localhost:3000/api/v1/auth/github">
                        {operation} in with Google
                    </a>
                </button>
            </div>
        </div>
    );
}
export default Oauth;
