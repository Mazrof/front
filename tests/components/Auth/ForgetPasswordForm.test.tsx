import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgetPasswordForm from "@/components/Auth/ForgetPasswordForm";
import { useRouter } from "next/navigation";
import { useOTPContext } from "@/store/OTPContext";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../store/OTPContext", () => ({
    useOTPContext: jest.fn(),
}));

describe("EmailInputForm", () => {
    let mockPush: jest.Mock;
    let mockSetOTPContext: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        mockSetOTPContext = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (useOTPContext as unknown as jest.Mock).mockReturnValue({
            setOTPContext: mockSetOTPContext,
        });
    });

    it("renders the form and submits valid email", async () => {
        render(<ForgetPasswordForm />);

        const emailInput = screen.getByLabelText("Email");
        const submitButton = screen.getByRole("button", { name: "Reset password" });

        await userEvent.type(emailInput, "test@example.com");

        await userEvent.click(submitButton);

        expect(mockSetOTPContext).toHaveBeenCalledWith("resetPassword", "test@example.com");

        expect(mockPush).toHaveBeenCalledWith("/verification");
    });

    it("does not submit the form when email is invalid", async () => {
        render(<ForgetPasswordForm />);

        const emailInput = screen.getByLabelText("Email");
        const submitButton = screen.getByRole("button", { name: "Reset password" });

        await userEvent.type(emailInput, "invalid-email");

        await userEvent.click(submitButton);

        expect(mockSetOTPContext).not.toHaveBeenCalled();

        expect(mockPush).not.toHaveBeenCalled();
    });
});
