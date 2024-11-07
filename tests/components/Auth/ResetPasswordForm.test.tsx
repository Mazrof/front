import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";

import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import userEvent from "@testing-library/user-event";

// Mock the external dependencies
jest.mock("react-hook-form", () => ({
    useForm: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
    zodResolver: jest.fn(),
}));

describe("ResetPasswordForm", () => {
    // Setup for common test scenarios
    const mockRegister = jest.fn();
    const mockHandleSubmit = jest.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Default mock implementation
        (useForm as jest.Mock).mockImplementation(() => ({
            register: mockRegister,
            handleSubmit: jest.fn((cb) => (e) => {
                e?.preventDefault?.();
                return mockHandleSubmit(cb);
            }),
            formState: {
                errors: {},
            },
        }));
    });

    it("renders all form elements correctly", () => {
        render(<ResetPasswordForm />);

        // Check for presence of all form elements
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Update Password" })).toBeInTheDocument();
    });

    it("displays validation error for short password", async () => {
        // Mock form state with password error
        (useForm as jest.Mock).mockImplementation(() => ({
            register: mockRegister,
            handleSubmit: jest.fn((cb) => (e) => {
                e?.preventDefault?.();
                return mockHandleSubmit(cb);
            }),
            formState: {
                errors: {
                    password: {
                        message: "Password must be at least 8 characters long",
                    },
                },
            },
        }));

        render(<ResetPasswordForm />);

        const submitButton = screen.getByRole("button", { name: "Update Password" });
        fireEvent.click(submitButton);

        expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    });

    it("displays validation error when passwords do not match", async () => {
        // Mock form state with confirm password error
        (useForm as jest.Mock).mockImplementation(() => ({
            register: mockRegister,
            handleSubmit: jest.fn((cb) => (e) => {
                e?.preventDefault?.();
                return mockHandleSubmit(cb);
            }),
            formState: {
                errors: {
                    confirmPassword: {
                        message: "Passwords do not match",
                    },
                },
            },
        }));

        render(<ResetPasswordForm />);

        const submitButton = screen.getByRole("button", { name: "Update Password" });
        fireEvent.click(submitButton);

        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });

    it("submits form successfully with valid data", async () => {
        const mockSubmitHandler = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => ({
            register: mockRegister,
            handleSubmit: jest.fn((cb) => (e) => {
                e?.preventDefault?.();
                return mockSubmitHandler(cb);
            }),
            formState: {
                errors: {},
            },
        }));

        render(<ResetPasswordForm />);

        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        const submitButton = screen.getByRole("button", { name: "Update Password" });

        fireEvent.change(passwordInput, { target: { value: "ValidPassword123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "ValidPassword123" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSubmitHandler).toHaveBeenCalled();
        });
    });

    it("applies correct CSS classes to form elements", () => {
        render(<ResetPasswordForm />);

        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        const submitButton = screen.getByRole("button", { name: "Update Password" });

        expect(passwordInput).toHaveClass("input-field");
        expect(confirmPasswordInput).toHaveClass("input-field");
        expect(submitButton).toHaveClass("auth-buttons", "my-4", "bg-blue-950", "text-white");
    });

    it("handles form submission prevention", () => {
        const mockPreventDefault = jest.fn();
        (useForm as jest.Mock).mockImplementation(() => ({
            register: mockRegister,
            handleSubmit: jest.fn((cb) => (e) => {
                e.preventDefault();
                mockPreventDefault();
                return mockHandleSubmit(cb);
            }),
            formState: {
                errors: {},
            },
        }));

        render(<ResetPasswordForm />);

        const form = screen.getByRole("form");
        fireEvent.submit(form);

        expect(mockPreventDefault).toHaveBeenCalled();
    });

    it("validates noValidate attribute on form", () => {
        render(<ResetPasswordForm />);
        const form = screen.getByRole("form");
        expect(form).toHaveAttribute("noValidate");
    });

    it("properly registers form fields with react-hook-form", () => {
        render(<ResetPasswordForm />);

        expect(mockRegister).toHaveBeenCalledWith("password");
        expect(mockRegister).toHaveBeenCalledWith("confirmPassword");
    });
});
