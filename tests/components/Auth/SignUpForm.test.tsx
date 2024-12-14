import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "@/components/Auth/SignUpForm";
import Oauth from "@/components/Auth/Oauth";
import { OAuthProps } from "@/types/auth";
import { SignupWithEmail, SendEmailCode } from "@/services/User";
import { useRouter } from "next/navigation";

// Mock the next/router module
jest.mock("next/navigation", () => ({
    useRouter: jest.fn().mockReturnValue({
        route: "/",
        pathname: "",
        push: jest.fn(),
    }),
}));

jest.mock("../../../services/User/index", () => ({
    SignupWithEmail: jest.fn(),
    SendEmailCode: jest.fn(),
}));

jest.mock("../../../components/Auth/Oauth", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn((props: OAuthProps) => <div data-testid="mock-button">{props.operation}</div>),
}));

describe("SignUpForm", () => {
    describe("Render", () => {
        it("Should render name input field", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const nameField = screen.getByTestId("name");
            expect(nameField).toBeInTheDocument();
        });

        it("Should render username input field", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const usernameField = screen.getByTestId("username");
            expect(usernameField).toBeInTheDocument();
        });

        it("Should render email input field", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const emailField = screen.getByTestId("email");
            expect(emailField).toBeInTheDocument();
        });

        it("Should render password input field", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const passwordField = screen.getByTestId("password");
            expect(passwordField).toBeInTheDocument();
        });

        it("Should render repeat password input field", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const repeatPasswordField = screen.getByTestId("repeatPassword");
            expect(repeatPasswordField).toBeInTheDocument();
        });

        it("Should render create account button", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const createAccountButton = screen.getByRole("button", { name: "Create account" });
            expect(createAccountButton).toBeInTheDocument();
        });

        it("Should render log in link", () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const loginLink = screen.getByText("Log in");
            expect(loginLink).toBeInTheDocument();
        });
    });

    describe("Functionality", () => {
        it("Should show error message if email is invalid", async () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const emailField = screen.getByTestId("email");
            const submitButton = screen.getByTestId("submit");
            const nameField = screen.getByTestId("name");
            const usernameField = screen.getByTestId("username");
            await userEvent.type(emailField, "invalid-email");
            await userEvent.click(submitButton);

            await waitFor(() => {
                const error = screen.getByTestId("email-error");
                expect(error).toHaveTextContent("Email is invalid");
                expect(error).toBeInTheDocument();
            });
        });

        it("Should show error message if passwords do not match", async () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const passwordField = screen.getByTestId("password");
            const repeatPasswordField = screen.getByTestId("repeatPassword");
            const submitButton = screen.getByRole("button", { name: "Create account" });

            await userEvent.type(passwordField, "Valid@1234");
            await userEvent.type(repeatPasswordField, "Mismatch@1234");
            await userEvent.click(submitButton);

            await waitFor(() => {
                const errorElement = screen.getByText("Passwords do not match"); // Locate the element by its text content
                expect(errorElement).toBeInTheDocument();
            });
        });

        it("Should redirect to verification page on successful submission", async () => {
            (SignupWithEmail as jest.Mock).mockReturnValue({
                status: "success",
                data: {},
            });

            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const nameField = screen.getByTestId("name");
            const usernameField = screen.getByTestId("username");
            const emailField = screen.getByTestId("email");
            const passwordField = screen.getByTestId("password");
            const repeatPasswordField = screen.getByTestId("repeatPassword");
            const submitButton = screen.getByRole("button", { name: "Create account" });
            await userEvent.type(nameField, "ahmed");
            await userEvent.type(usernameField, "sdsddfdsg");
            await userEvent.type(emailField, "test@example.com");
            await userEvent.type(passwordField, "Valid@1234");
            await userEvent.type(repeatPasswordField, "Valid@1234");
            await userEvent.click(submitButton);

            await waitFor(() => {
                expect(SendEmailCode).toHaveBeenCalledWith("test@example.com");
                expect(useRouter().push).toHaveBeenCalledWith("/verification");
            });
        });

        it("Should redirect to login page on clicking Log in link", async () => {
            render(
                <SignUpForm>
                    <Oauth operation="Sign up" />
                </SignUpForm>
            );

            const loginLink = screen.getByText("Log in");

            await userEvent.click(loginLink);

            await waitFor(() => {
                expect(useRouter().push).toHaveBeenCalledWith("/login");
            });
        });
    });
});
