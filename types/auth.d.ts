export type type = string;
export type placeholder = string;
export type label = string;
type OTPContextType = "verifyAccount" | "resetPassword" | "";
export type OTPState = {
    email: string;
    OTPContext: OTPContextType;
    setOTPContext: (context: OTPContextType, email: string) => void;
    cleanOTPContext: () => void;
};
export type OAuthProps = {
    operation: "Login" | "Sign up";
};
