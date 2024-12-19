import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteMessage from "@/components/Chats/Message/DeleteMessage";

// Mock the dialog components to handle state properly in tests
jest.mock("@/components/ui/dialog", () => {
    return {
        Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
            return (
                <div data-testid="dialog" data-state={open ? "open" : "closed"}>
                    {children}
                </div>
            );
        },
        DialogTrigger: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="dialog-trigger">
                {children}
            </div>
        ),
        DialogContent: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="dialog-content" role="dialog">
                {children}
            </div>
        ),
        DialogHeader: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="dialog-header">{children}</div>
        ),
        DialogFooter: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="dialog-footer">{children}</div>
        ),
        DialogClose: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="dialog-close">
                {children}
            </div>
        ),
    };
});

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick, disabled, type = "button", variant, className, "data-testid": dataTestId }: any) => (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            data-variant={variant}
            className={className}
            data-testid={dataTestId}
        >
            {children}
        </button>
    ),
}));

// Mock Loader2 component
jest.mock("lucide-react", () => ({
    Loader2: () => <div data-testid="loader" className="mr-2 h-4 w-4 animate-spin">Loading...</div>,
}));

describe("DeleteMessage", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Spy on console methods
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
        // Reset timers
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("renders delete button initially", () => {
        render(<DeleteMessage />);
        
        const deleteButton = screen.getByText("Delete");
        expect(deleteButton).toBeInTheDocument();
        expect(deleteButton).toHaveAttribute("data-variant", "ghost");
    });

    it("opens dialog when delete button is clicked", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Click delete button
        await user.click(screen.getByText("Delete"));

        // Check if dialog content is shown
        const dialog = screen.getByTestId("dialog-content");
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText("Delete Message")).toBeInTheDocument();
        expect(screen.getByText("Are you sure you want to delete this message? This action cannot be undone.")).toBeInTheDocument();
    });

    it("displays loading state when deleting", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Open dialog and click confirm button
        await user.click(screen.getByText("Delete"));
        const confirmButton = screen.getByTestId("delete-confirmButton");
        await user.click(confirmButton);

        // Wait for loading state to appear
        expect(confirmButton).toBeDisabled();
        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(screen.getByText("Deleting...")).toBeInTheDocument();

        // Fast-forward timer
        jest.advanceTimersByTime(1000);
    });

    it("handles successful deletion", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Open dialog and click confirm button
        await user.click(screen.getByText("Delete"));
        await user.click(screen.getByTestId("delete-confirmButton"));

        // Fast-forward timer
        jest.advanceTimersByTime(1000);

        // Wait for success message and dialog close
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Message deleted successfully!");
            expect(screen.getByTestId("dialog")).toHaveAttribute("data-state", "closed");
        });
    });

    it("handles deletion error", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        
        // Mock console.log to throw an error
        jest.spyOn(console, "log").mockImplementationOnce(() => {
            throw new Error("Delete failed");
        });

        render(<DeleteMessage />);

        // Open dialog and click confirm button
        await user.click(screen.getByText("Delete"));
        await user.click(screen.getByTestId("delete-confirmButton"));

        // Fast-forward timer
        jest.advanceTimersByTime(1000);

        // Wait for error message
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to delete the message.");
        });
    });

    it("closes dialog when cancel is clicked", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Open dialog
        await user.click(screen.getByText("Delete"));
        
        // Verify dialog is open
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        // Click cancel button
        const cancelButton = screen.getByTestId("delete-cancelButton");
        await user.click(cancelButton);

        // Verify the dialog state has changed
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-state", "closed");
    });

    // Test accessibility
    it("has correct ARIA attributes", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Check dialog trigger button
        const deleteButton = screen.getByText("Delete");
        expect(deleteButton).toHaveAttribute("type", "button");

        // Open dialog
        await user.click(deleteButton);

        // Check dialog role
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("maintains proper button states", async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        render(<DeleteMessage />);

        // Open dialog
        await user.click(screen.getByText("Delete"));

        // Check initial button states
        const confirmButton = screen.getByTestId("delete-confirmButton");
        const cancelButton = screen.getByTestId("delete-cancelButton");

        expect(confirmButton).not.toBeDisabled();
        expect(cancelButton).not.toBeDisabled();

        // Click confirm and check loading state
        await user.click(confirmButton);
        
        // Check loading state immediately
        expect(confirmButton).toBeDisabled();
        expect(cancelButton).toBeDisabled();
        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(screen.getByText("Deleting...")).toBeInTheDocument();

        // Fast-forward timer
        jest.advanceTimersByTime(1000);
    });
});
