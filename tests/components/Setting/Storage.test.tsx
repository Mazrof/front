import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Storage from "@/components/Settings/Storage";
import { useSettings, useSettingsPageType } from "@/store/settings";
import { updateProfile } from "@/services/Settings";
import { useRouter } from "next/navigation";

jest.mock("../../../store/settings", () => ({
    useSettingsPageType: jest.fn(),
    useSettings: jest.fn(),
}));

jest.mock("../../../services/Settings", () => ({
    updateProfile: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("Storage Component", () => {
    const mockSetSettings = jest.fn();
    const mockRouterPush = jest.fn();
    beforeAll(() => {
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });
    beforeEach(() => {
        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            settingPageName: "Storage", 
        });

        (useSettings as unknown as jest.Mock).mockReturnValue({
            settings: { autoDownloadSizeLimit: 50, maxLimitFileSize: 50 },
            setSettings: mockSetSettings,
        });

        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush,
        });

        // Clear mocks before each test
        jest.clearAllMocks();
    });

    it("renders the component with correct initial values", () => {
        render(<Storage />);

        expect(screen.getByText(/Max Media Size Auto Download/)).toBeInTheDocument();
        expect(screen.getByText(/Max Media Size Upload/)).toBeInTheDocument();
    });      
    it("redirects to login if response status is fail with 401", async () => {
        const mockResponse = { status: "fail", error: { statusCode: 401 } };
        (updateProfile as jest.Mock).mockResolvedValueOnce(mockResponse);

        render(<Storage />);

        const saveButton = screen.getByRole("button", { name: /Save/i });
        await userEvent.click(saveButton);

        await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/login"));
    });
});
