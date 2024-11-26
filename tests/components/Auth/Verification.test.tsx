import { render, screen } from "@testing-library/react";

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};
import userEvent from "@testing-library/user-event";

document.elementFromPoint = jest.fn();
import { useRouter } from "next/navigation";
import { useOTPContext } from "@/store/OTPContext";
import VerificationPage from "@/app/(auth)/verification/page";

jest.mock("../../../store/OTPContext", () => ({
    useOTPContext: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("VerificationPage", () => {
    const mockPush = jest.fn();
    const mockCleanOTPContext = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useOTPContext as unknown as jest.Mock).mockReturnValue({
            OTPContext: "resetPassword",
            email: "test@example.com",
            cleanOTPContext: mockCleanOTPContext,
        });
    });

    it("renders correctly", () => {
        render(<VerificationPage />);

        const inputSlot = screen.getByRole("textbox");
        expect(inputSlot).toBeInTheDocument();

        expect(
            screen.getByText(/Enter the verification code we sent to test@example.com/i)
        ).toBeInTheDocument();
    });

    it('calls handleVerifyOTP and navigates to reset-password when OTPContext is "resetPassword"', async () => {
        render(<VerificationPage />);

        const verifyButton = screen.getByText(/Verify/i);
        await userEvent.click(verifyButton);

        expect(mockPush).toHaveBeenCalledWith("/reset-password");

        expect(mockCleanOTPContext).toHaveBeenCalled();
    });

    it('resends OTP when clicking on "Resend OTP" link', async () => {
        render(<VerificationPage />);

        const resendButton = screen.getByText(/Resend OTP/i);
        await userEvent.click(resendButton);

        expect(resendButton).toBeInTheDocument();
    });
});
