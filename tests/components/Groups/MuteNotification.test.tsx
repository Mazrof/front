import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuteNotification from "@/components/Groups/MuteNotification";
import { muteNotification } from "@/services/Group";

// Mock the services
jest.mock("@/services/Group");

// Mock the UI components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
        <div data-testid="dialog" data-open={open}>
            {children}
        </div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>,
    DialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-header">{children}</div>,
    DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    DialogFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-footer">{children}</div>,
}));

jest.mock("@/components/ui/radio-group", () => ({
    RadioGroup: ({ children, value, onValueChange }: { children: React.ReactNode; value: string; onValueChange: (value: string) => void }) => (
        <div data-testid="radio-group" data-value={value} onChange={(e: any) => onValueChange(e.target.value)}>
            {children}
        </div>
    ),
    RadioGroupItem: ({ value }: { value: string }) => <input type="radio" value={value} />,
}));

describe("MuteNotification", () => {
    const defaultProps = {
        groupId: 123,
        isOpen: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (muteNotification as jest.Mock).mockResolvedValue({ status: "success" });
    });

    it("renders with initial values", () => {
        render(<MuteNotification {...defaultProps} />);
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "true");
        expect(screen.getByText("Mute Notifications")).toBeInTheDocument();
    });

    it("displays all mute duration options", () => {
        render(<MuteNotification {...defaultProps} />);
        
        const muteOptions = [
            "Mute for 1 hour",
            "Mute for 4 hours",
            "Mute for 8 hours",
            "Mute for 1 day",
            "Mute for 3 days",
            "Mute Forever",
        ];

        muteOptions.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    it("handles form submission with valid duration", async () => {
        const user = userEvent.setup();
        render(<MuteNotification {...defaultProps} />);

        // Select a mute duration
        await user.click(screen.getByText("Mute for 1 hour"));

        // Submit form
        await user.click(screen.getByRole("button", { name: /mute/i }));

        await waitFor(() => {
            expect(muteNotification).toHaveBeenCalledWith(defaultProps.groupId, { muteDuration: "1h" });
            expect(defaultProps.onClose).toHaveBeenCalled();
        });
    });

    it("shows loading state during submission", async () => {
        const user = userEvent.setup();
        render(<MuteNotification {...defaultProps} />);

        // Select a mute duration and submit
        await user.click(screen.getByText("Mute for 1 hour"));
        await user.click(screen.getByRole("button", { name: /mute/i }));

        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("handles API error response", async () => {
        const user = userEvent.setup();
        (muteNotification as jest.Mock).mockResolvedValue({
            status: "fail",
            message: "Failed to mute notifications",
        });

        render(<MuteNotification {...defaultProps} />);

        // Select a mute duration and submit
        await user.click(screen.getByText("Mute for 1 hour"));
        await user.click(screen.getByRole("button", { name: /mute/i }));

        await waitFor(() => {
            expect(screen.getByText("Failed to mute notifications")).toBeInTheDocument();
        });
    });

    it("handles unexpected errors", async () => {
        const user = userEvent.setup();
        (muteNotification as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

        render(<MuteNotification {...defaultProps} />);

        // Select a mute duration and submit
        await user.click(screen.getByText("Mute for 1 hour"));
        await user.click(screen.getByRole("button", { name: /mute/i }));

        await waitFor(() => {
            expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
        });
    });

    it("closes dialog when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<MuteNotification {...defaultProps} />);

        await user.click(screen.getByRole("button", { name: /cancel/i }));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("validates mute duration selection", async () => {
        const user = userEvent.setup();
        render(<MuteNotification {...defaultProps} />);

        // Try to submit without selecting a duration (though there's a default value)
        await user.click(screen.getByRole("button", { name: /mute/i }));

        await waitFor(() => {
            expect(muteNotification).toHaveBeenCalledWith(defaultProps.groupId, { muteDuration: "forever" });
        });
    });
});
