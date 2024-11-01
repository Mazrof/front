import { OTPState } from "@/types/auth"
import { create } from "zustand"

export const useOTPContext = create<OTPState>((set) => ({
    email: "",
    OTPContext: "",
    setOTPContext: (context, email) => set({ OTPContext: context, email }),
    cleanOTPContext: () => set({ OTPContext: "", email: "" }),
}));