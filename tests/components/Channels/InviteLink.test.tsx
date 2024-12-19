import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InviteLinkDialog from "@/components/Channels/InviteLink";

// Mock the clipboard API
const mockClipboard = {
    writeText: jest.fn()
};
Object.assign(navigator, {
    clipboard: mockClipboard
});

describe("InviteLinkDialog", () => {
    const mockProps = {
        inviteLink: "https://example.com/invite/123",
        isOpen: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("renders the dialog with invite link when open", () => {
        render(<InviteLinkDialog {...mockProps} />);
        
        expect(screen.getByText("Invite Link")).toBeInTheDocument();
        expect(screen.getByText(mockProps.inviteLink)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
        expect(screen.getByText("Share this link to invite others to join the channel")).toBeInTheDocument();
    });

    it("doesn't render dialog content when closed", () => {
        render(<InviteLinkDialog {...mockProps} isOpen={false} />);
        
        expect(screen.queryByText("Invite Link")).not.toBeInTheDocument();
    });

    it("calls onClose when dialog is closed", () => {
        render(<InviteLinkDialog {...mockProps} />);
        
        const dialog = screen.getByRole("dialog");
        fireEvent.keyDown(dialog, { key: "Escape" });
        
        expect(mockProps.onClose).toHaveBeenCalled();
    });

    it("copies invite link to clipboard and shows feedback", async () => {
        const user = userEvent.setup();
        mockClipboard.writeText.mockImplementation(() => Promise.resolve());
        
        render(<InviteLinkDialog {...mockProps} />);
        
        // Click the copy button
        const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
        await act(async () => {
            await user.click(copyButton);
        });

        // Verify clipboard API was called
        await waitFor(() => {
            expect(mockClipboard.writeText).toHaveBeenCalledWith(mockProps.inviteLink);
        });
        
        // Verify "Copied!" text appears
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /copied!/i })).toBeInTheDocument();
        });

        // Fast-forward timers
        await act(async () => {
            jest.advanceTimersByTime(2000);
        });

        // Verify text changes back
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
        });
    });

    it("handles clipboard error gracefully", async () => {
        const user = userEvent.setup();
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        mockClipboard.writeText.mockRejectedValue(new Error("Failed to copy text"));

        render(<InviteLinkDialog {...mockProps} />);
        
        // Click the copy button
        const copyButton = screen.getByRole('button', { name: /copy to clipboard/i });
        await act(async () => {
            await user.click(copyButton);
        });

        // Verify error was logged
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith("Failed to copy text: ", expect.any(Error));
        });
        
        // Button text should remain unchanged
        expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
        
        consoleSpy.mockRestore();
    });
});
