import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroupDemo } from "@/components/Settings/RadioComponent";
import { useRouter } from "next/navigation";
import { useWhoCanAttributes, useSettings } from "@/store/settings";
import { updateProfile } from "@/services/Settings";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("../../../store/settings", () => ({
    useWhoCanAttributes: jest.fn(),
    useSettings: jest.fn(),
}));

jest.mock("../../../services/Settings", () => ({
    updateProfile: jest.fn(),
}));

describe("RadioGroupDemo Component", () => {
    const mockRouter = { push: jest.fn() };
    const mockSetWhoCanAttributes = jest.fn();
    const mockSetSettings = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useWhoCanAttributes as unknown as jest.Mock).mockReturnValue({
            attribute: {
                privacyName: "storyVisibility",
                value: "everyone",
            },
            setWhoCanAttributes: mockSetWhoCanAttributes,
        });
        (useSettings as unknown as jest.Mock).mockReturnValue({
            setSettings: mockSetSettings,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders radio buttons correctly when attribute is present", () => {
        render(<RadioGroupDemo />);
        expect(screen.getByLabelText("Everyone")).toBeInTheDocument();
        expect(screen.getByLabelText("Contacts")).toBeInTheDocument();
        expect(screen.getByLabelText("Nobody")).toBeInTheDocument();
    });

    it("displays 'Loading...' when attribute is null", () => {
        (useWhoCanAttributes as unknown as jest.Mock).mockReturnValue({
            attribute: null,
            setWhoCanAttributes: mockSetWhoCanAttributes,
        });

        render(<RadioGroupDemo />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("updates settings and calls setWhoCanAttributes on success", async () => {
        (updateProfile as jest.Mock).mockResolvedValueOnce({
            status: "success",
            data: { updatedUser: { storyVisibility: "contacts" } },
        });

        render(<RadioGroupDemo />);
        const contactsRadio = screen.getByLabelText("Contacts");

        await userEvent.click(contactsRadio);

        await waitFor(() => {
            expect(mockSetWhoCanAttributes).toHaveBeenCalledWith({
                privacyName: "storyVisibility",
                value: "contacts",
            });
        });

        expect(mockSetSettings).toHaveBeenCalledWith({
            storyVisibility: "contacts",
        });
    });

    it("redirects to '/login' on 401 or 404 error", async () => {
        (updateProfile as jest.Mock).mockResolvedValueOnce({
            status: "fail",
            error: { statusCode: 401 },
        });

        render(<RadioGroupDemo />);
        const nobodyRadio = screen.getByLabelText("Nobody");

        await userEvent.click(nobodyRadio);

        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith("/login");
        });
    });

    it("redirects to 'Error' on other errors", async () => {
        (updateProfile as jest.Mock).mockResolvedValueOnce({
            status: "fail",
            error: { statusCode: 500 },
        });

        render(<RadioGroupDemo />);
        const nobodyRadio = screen.getByLabelText("Nobody");

        await userEvent.click(nobodyRadio);

        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith("Error");
        });
    });
});
