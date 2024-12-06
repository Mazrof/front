import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { Logout } from "@/components/Settings/Logout";
import { logout } from "@/services/User";
import { useSettingsPageType } from "@/store/settings";
import userEvent from "@testing-library/user-event";

// Mock external dependencies
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../services/User", () => ({
    logout: jest.fn(),
}));

jest.mock("../../../store/settings", () => ({
    useSettingsPageType: jest.fn(),
}));


describe("Logout Component", () => {
    const mockPush = jest.fn();
    const mockSetPageName = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            setPageName: mockSetPageName,
        });

        jest.clearAllMocks();
    });

    test("renders the Logout button with a tooltip", () => {
        render(<Logout />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("calls logout and navigates to /login on clicking the Logout button", async () => {
        (logout as jest.Mock).mockResolvedValueOnce(undefined);

        render(<Logout />);
        const tooltipTrigger = screen.getByRole("button");
        await userEvent.hover(tooltipTrigger);
        const logoutButton =( await screen.findAllByText("Logout"))[0];
        await userEvent.click(logoutButton);
        await waitFor(() => expect(logout).toHaveBeenCalledTimes(1));
        expect(mockSetPageName).toHaveBeenCalledWith(null);
        expect(mockPush).toHaveBeenCalledWith("/login");
    });

    test("displays 'Loading...' when logout is in progress", async () => {
        (logout as jest.Mock).mockImplementationOnce(
            () => new Promise((resolve) => setTimeout(resolve, 100))
        );

        render(<Logout />);
        const tooltipTrigger = screen.getByRole("button");

       
        await userEvent.hover(tooltipTrigger);

      
        const logoutButton = (await screen.findAllByText("Logout"))[0];

        
        await userEvent.click(logoutButton);

      
        expect((await screen.findAllByText("Loading..."))[0]).toBeInTheDocument();
    });
});