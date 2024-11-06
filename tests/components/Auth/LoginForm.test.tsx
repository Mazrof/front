import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/Auth/LoginForm";
import Oauth from "@/components/Auth/Oauth";
import { OAuthProps } from "@/types/auth";
import { LoginWithEmail } from "@/services/User";
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
    LoginWithEmail: jest.fn(),
}));
jest.mock("../../../components/Auth/Oauth", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn((props: OAuthProps) => <div data-testid="mock-button">{props.operation}</div>),
}));
describe("LoginForm", () => {
    describe("Render", () => {
        it("Should render an email input field", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );

            const emailField = screen.getByTestId("email");
            expect(emailField).toBeInTheDocument();
        });
        it("Should render an password input field", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const paswordField = screen.getByTestId("password");
            expect(paswordField).toBeInTheDocument();
        });
        it("Should render login button", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const login = screen.getByRole("button", { name: "Login" });
            expect(login).toBeInTheDocument();
        });
        it("Should render forget password button", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const forgetPassword = screen.getByRole("button", { name: "Forget Password?" });
            expect(forgetPassword).toBeInTheDocument();
        });
        it("Should render signup button", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const signup = screen.getByRole("button", { name: "Sign Up" });
            expect(signup).toBeInTheDocument();
        });
        it("Should render OAuth Component", () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const oAuth = screen.getByTestId("mock-button");
            expect(oAuth).toBeInTheDocument();
        });
    });
    describe("Functionality", () => {
        it("should show error message if email format is wrong", async () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const emailField = screen.getByTestId("email");
            const login = screen.getByRole("button", { name: "Login" });
            await userEvent.type(emailField, "example@");
            await userEvent.click(login);
            await waitFor(() => {
                const error = screen.getByTestId("email-error");
                expect(error).toBeInTheDocument();
            });
        });
        it("should show error message if password format is wrong", async () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const paswordField = screen.getByTestId("password");
            const login = screen.getByRole("button", { name: "Login" });
            await userEvent.type(paswordField, "123");
            await userEvent.click(login);
            await waitFor(() => {
                const error = screen.getByTestId("password-error");
                expect(error).toBeInTheDocument();
            });
        });

        it("should show error message if the BE return an error message ", async () => {
            (LoginWithEmail as jest.Mock).mockReturnValue({ error: "Invalid" });
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const paswordField = screen.getByTestId("password");
            const emailField = screen.getByTestId("email");
            const login = screen.getByRole("button", { name: "Login" });
            await userEvent.type(paswordField, "12345678");
            await userEvent.type(emailField, "example@example.com");
            await userEvent.click(login);
            await waitFor(() => {
                const error = screen.getByTestId("root-error");
                expect(error).toBeInTheDocument();
            });
        });
        it("should go to home page if the user loggedin ", async () => {
            (LoginWithEmail as jest.Mock).mockReturnValue({
                access_token: "access token",
                refresh_token: "refresh token",
            });
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const paswordField = screen.getByTestId("password");
            const emailField = screen.getByTestId("email");
            const login = screen.getByRole("button", { name: "Login" });
            await userEvent.type(paswordField, "12345678");
            await userEvent.type(emailField, "example@example.com");
            await userEvent.click(login);
            await waitFor(() => {
                expect(useRouter().push).toHaveBeenCalledWith("/");
            });
        });
        it("should go to signup page when click to Signup button", async () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const signupButton = screen.getByRole("button", { name: "Sign Up" });
            await userEvent.click(signupButton);
            await waitFor(() => {
                expect(useRouter().push).toHaveBeenCalledWith("/signup");
            });
        });
        it("should go to forget password page when click to Forget Password button", async () => {
            render(
                <LoginForm>
                    <Oauth operation="Login" />
                </LoginForm>
            );
            const forgetPasswordButton = screen.getByRole("button", { name: "Forget Password?" });
            await userEvent.click(forgetPasswordButton);
            await waitFor(() => {
                expect(useRouter().push).toHaveBeenCalledWith("/forget-password");
            });
        });
    });
});
