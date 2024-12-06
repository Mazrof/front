import { render, screen, waitFor } from "@testing-library/react";
import ProfileForm from "@/components/Settings/ProfileForm";
import { useSettings } from "@/store/settings";
import { updateProfile } from "@/services/Settings";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../store/settings", () => ({
    useSettings: jest.fn(),
}));

jest.mock("../../../services/Settings", () => ({
    updateProfile: jest.fn(),
}));

describe("ProfileForm", () => {
    const mockSetSettings = jest.fn();
    const mockRouter = { push: jest.fn() };
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useSettings as unknown as jest.Mock).mockReturnValue({
            settings: {
                email: "test@example.com",
                phone: "1234567890",
                photo: "test.jpg",
                username: "testuser",
                screenName: "Test User",
                bio: "Hello, world!",
            },
            setSettings: mockSetSettings,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders form fields with initial values", () => {
        render(<ProfileForm />);
        expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
        expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    });

    it("shows validation error for invalid email", async () => {
        render(<ProfileForm />);
        const emailInput = screen.getByDisplayValue("test@example.com");
        const saveButton = screen.getAllByTitle("save")[0];

        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, "invalidemail");

        await userEvent.click(saveButton);

        expect(await screen.findByText("Invalid email")).toBeInTheDocument();

    });

    it("updates profile on valid input", async () => {
        (updateProfile as jest.Mock).mockResolvedValueOnce({
            status: "success",
            data: { updatedUser: { email: "new@example.com" } },
        });

        render(<ProfileForm />);
        const emailInput = screen.getByDisplayValue("test@example.com");
        const saveButton = screen.getAllByTitle("save")[0];

        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, "new@example.com");

        await userEvent.click(saveButton);

        await waitFor(() => {
            expect(mockSetSettings).toHaveBeenCalledWith({
                email: "new@example.com",
            });
        });
    });

});
