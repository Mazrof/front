import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PrivacySecurity from "@/components/Settings/PrivacySecurity";
import { useSettings, useSettingsPageType, useWhoCanAttributes } from "@/store/settings";
import { handleOnClick } from "@/utils/settings";

jest.mock("../../../store/settings", () => ({
    useSettings: jest.fn(),
    useSettingsPageType: jest.fn(),
    useWhoCanAttributes: jest.fn(),
}));

jest.mock("../../../utils/settings", () => ({
    handleOnClick: jest.fn(),
}));

describe("PrivacySecurity Component", () => {
    const mockSetPageName = jest.fn();
    const mockSetWhoCanAttributes = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock the hooks
        (useSettings as unknown as jest.Mock).mockReturnValue({
            settings: {
                storyVisibility: "Everyone",
                profilePicVisibility: "My Contacts",
                lastSeenVisibility: "Nobody",
                readReceiptsEnabled: "Enabled",
            },
        });

        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            settingPageName: "Privacy Settings",
            setPageName: mockSetPageName,
        });

        (useWhoCanAttributes as unknown as jest.Mock).mockReturnValue({
            setWhoCanAttributes: mockSetWhoCanAttributes,
        });
    });

    test("renders privacy settings correctly", () => {
        render(<PrivacySecurity />);

        expect(screen.getByText("Blocked Users")).toBeInTheDocument();
        expect(screen.getByText("Privacy")).toBeInTheDocument();
        expect(screen.getByText("Who can see my story?")).toBeInTheDocument();
        expect(screen.getByText("Everyone")).toBeInTheDocument();
        expect(screen.getByText("Who can see my profile photo?")).toBeInTheDocument();
        expect(screen.getByText("My Contacts")).toBeInTheDocument();
        expect(screen.getByText("Who can see my Last seen time?")).toBeInTheDocument();
        expect(screen.getByText("Nobody")).toBeInTheDocument();
        expect(screen.getByText("Who can see read receipts ?")).toBeInTheDocument();
        expect(screen.getByText("Enabled")).toBeInTheDocument();
    });

    test("calls handleOnClick when Blocked Users is clicked", async () => {
        render(<PrivacySecurity />);

        const blockedUsersButton = screen.getByText("Blocked Users");
        await userEvent.click(blockedUsersButton);

        expect(handleOnClick).toHaveBeenCalledWith(
            expect.any(Object), // The event object
            "Block",
            mockSetPageName
        );
    });

    test("calls setWhoCanAttributes and navigates to Privacy page when Who Can buttons are clicked", async () => {
        render(<PrivacySecurity />);

        const storyButton = screen.getByText("Who can see my story?");
        await userEvent.click(storyButton);

        expect(mockSetWhoCanAttributes).toHaveBeenCalledWith({
            title: "Stories",
            privacyName: "storyVisibility",
            value: "Everyone",
        });
        expect(mockSetPageName).toHaveBeenCalledWith("Privacy");

        const profilePhotoButton = screen.getByText("Who can see my profile photo?");
        await userEvent.click(profilePhotoButton);

        expect(mockSetWhoCanAttributes).toHaveBeenCalledWith({
            title: "Profile Photo",
            privacyName: "profilePicVisibility",
            value: "My Contacts",
        });
        expect(mockSetPageName).toHaveBeenCalledWith("Privacy");

        const lastSeenButton = screen.getByText("Who can see my Last seen time?");
        await userEvent.click(lastSeenButton);

        expect(mockSetWhoCanAttributes).toHaveBeenCalledWith({
            title: "Last Seen",
            privacyName: "lastSeenVisibility",
            value: "Nobody",
        });
        expect(mockSetPageName).toHaveBeenCalledWith("Privacy");

        const readReceiptsButton = screen.getByText("Who can see read receipts ?");
        await userEvent.click(readReceiptsButton);

        expect(mockSetWhoCanAttributes).toHaveBeenCalledWith({
            title: "Read Receipts",
            privacyName: "readReceiptsEnabled",
            value: "Enabled",
        });
        expect(mockSetPageName).toHaveBeenCalledWith("Privacy");
    });
   
});
