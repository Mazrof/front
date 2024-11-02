type OTPContextType = 'verifyAccount' | 'resetPassword' | "";
export type OTPState = {
    email: string;
    OTPContext: OTPContextType;
    setOTPContext: (context: OTPContextType, email: string) => void;
    cleanOTPContext: () => void;
}