import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChannelSettingsDialog from "../../../components/Channels/ChannelSettings";
import { updateChannelSettings } from "../../../services/Channel";

// Mock dependencies
jest.mock("../../../services/Channel", () => ({
    updateChannelSettings: jest.fn(),
}));

jest.mock("../../../hooks/use-toast", () => ({
    toast: jest.fn(),
}));

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe("ChannelSettingsDialog", () => {
    const defaultProps = {
        channelId: 1,
        isOpen: true,
        canAddComments: true,
        privacy: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the channel settings dialog when open", () => {
        render(<ChannelSettingsDialog {...defaultProps} />);

        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Channel Settings" })).toBeInTheDocument();
    });

    it("doesn't render the dialog when isOpen is false", () => {
        render(<ChannelSettingsDialog {...{ ...defaultProps, isOpen: false }} />);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders form fields with default values", () => {
        render(<ChannelSettingsDialog {...defaultProps} />);

        // Check privacy options
        const publicRadio = screen.getByRole("radio", { name: "Public" });
        const privateRadio = screen.getByRole("radio", { name: "Private" });
        expect(publicRadio).toBeInTheDocument();
        expect(privateRadio).toBeInTheDocument();
        expect(publicRadio).toBeChecked();

        // Check ability to comment options
        const allowCommentsRadio = screen.getByRole("radio", { name: "Allow Comments" });
        const noCommentsRadio = screen.getByRole("radio", { name: "No Comments" });
        expect(allowCommentsRadio).toBeInTheDocument();
        expect(noCommentsRadio).toBeInTheDocument();
        expect(allowCommentsRadio).toBeChecked();

        // Check download permission options
        const allowDownloadRadio = screen.getByRole("radio", { name: "Allow Downloads" });
        const noDownloadRadio = screen.getByRole("radio", { name: "No Downloads" });
        expect(allowDownloadRadio).toBeInTheDocument();
        expect(noDownloadRadio).toBeInTheDocument();
        expect(noDownloadRadio).toBeChecked();
    });

    it("handles form submission successfully", async () => {
        const successResponse = { status: "success", data: {} };
        (updateChannelSettings as jest.Mock).mockResolvedValue(successResponse);

        render(<ChannelSettingsDialog {...defaultProps} />);

        // Change some settings
        await userEvent.click(screen.getByRole("radio", { name: "Private" }));
        await userEvent.click(screen.getByRole("radio", { name: "No Comments" }));
        await userEvent.click(screen.getByRole("radio", { name: "Allow Downloads" }));

        // Submit form
        await userEvent.click(screen.getByRole("button", { name: "Save Settings" }));

        await waitFor(() => {
            expect(updateChannelSettings).toHaveBeenCalledWith(defaultProps.channelId, {
                privacy: false,
                abilityToComment: false,
                downloadPermission: true,
            });
            expect(defaultProps.onClose).toHaveBeenCalled();
        });
    });

    it("handles form submission failure", async () => {
        const errorMessage = "Failed to update channel settings";
        const failResponse = { status: "fail", message: errorMessage };
        (updateChannelSettings as jest.Mock).mockResolvedValue(failResponse);

        render(<ChannelSettingsDialog {...defaultProps} />);

        // Submit form without changes
        await userEvent.click(screen.getByRole("button", { name: "Save Settings" }));

        await waitFor(() => {
            expect(updateChannelSettings).toHaveBeenCalledWith(defaultProps.channelId, {
                privacy: true,
                abilityToComment: true,
                downloadPermission: false,
            });
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(defaultProps.onClose).not.toHaveBeenCalled();
        });
    });

    it("handles unexpected errors during submission", async () => {
        const errorMessage = "Network error";
        (updateChannelSettings as jest.Mock).mockRejectedValue(new Error(errorMessage));

        render(<ChannelSettingsDialog {...defaultProps} />);

        // Submit form without changes
        await userEvent.click(screen.getByRole("button", { name: "Save Settings" }));

        await waitFor(() => {
            expect(
                screen.getByText(
                    `An unexpected error Error: ${errorMessage} occurred. Please try again later.`
                )
            ).toBeInTheDocument();
            expect(defaultProps.onClose).not.toHaveBeenCalled();
        });
    });

    it("closes dialog when cancel is clicked", async () => {
        render(<ChannelSettingsDialog {...defaultProps} />);

        await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(defaultProps.onClose).toHaveBeenCalled();
    });
});
