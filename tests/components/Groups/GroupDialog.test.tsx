import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUsers } from "@/hooks/useUsers";
import { createGroup } from "@/services/Group";
import GroupDialog from "@/components/Groups/GroupDialog";

// Mock ResizeObserver
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

// Add ResizeObserver to window
window.ResizeObserver = ResizeObserver;

// Mock the hooks and services
jest.mock("@/hooks/useUsers");
jest.mock("@/services/Group");

// Mock the UI components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog">{children}</div>
    ),
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-trigger">{children}</div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogFooter: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-footer">{children}</div>
    ),
    DialogClose: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-close">{children}</div>
    ),
}));

jest.mock("@/components/ui/button", () => ({
    Button: (props) => (
        <button data-testid="button" {...props}>
            {props.children}
        </button>
    ),
}));

jest.mock("@/components/ui/input", () => ({
    Input: (props) => <input data-testid="input-name" {...props} />,
}));

jest.mock("@/components/ui/label", () => ({
    Label: (props) => (
        <label data-testid={`label-${props.htmlFor}`} {...props}>
            {props.children}
        </label>
    ),
}));

jest.mock("@/components/ui/radio-group", () => ({
    RadioGroup: ({ children, onValueChange, value }) => (
        <div data-testid="radio-group" data-value={value}>
            {children}
        </div>
    ),
    RadioGroupItem: (props) => <input type="radio" {...props} />,
}));

describe("GroupDialog", () => {
    beforeEach(() => {
        (useUsers as jest.Mock).mockReturnValue({
            users: [
                { id: 1, username: "user1" },
                { id: 2, username: "user2" },
            ],
            isLoading: false,
        });
    });

    it("renders create group button initially", () => {
        render(<GroupDialog />);
        expect(screen.getByText("New Group")).toBeInTheDocument();
    });

    it("shows loading state when fetching users", () => {
        (useUsers as jest.Mock).mockReturnValue({
            users: [],
            isLoading: true,
        });

        render(<GroupDialog />);
        expect(screen.getByText("Loading users...")).toBeInTheDocument();
    });

    it("validates group name", async () => {
        const user = userEvent.setup();
        render(<GroupDialog />);

        // Open dialog
        await user.click(screen.getByText("New Group"));

        // Try to submit without name
        const submitButton = screen.getByRole("button", { name: "Create Group" });
        await user.click(submitButton);
        const errorMessage = screen.getByText("Group name must be at least 3 characters");
        expect(errorMessage).toBeInTheDocument();

        // Enter invalid name (too short)
        const nameInput = screen.getByTestId("input-name");
        await user.type(nameInput, "ab");
        await user.click(submitButton);
        expect(errorMessage).toBeInTheDocument();
    });

    it("handles successful group creation", async () => {
        const user = userEvent.setup();
        const mockCreateGroup = createGroup as jest.Mock;
        mockCreateGroup.mockResolvedValueOnce({ status: "success" });

        render(<GroupDialog />);

        // Open dialog
        await user.click(screen.getByText("New Group"));

        // Fill form with valid data
        const nameInput = screen.getByTestId("input-name");
        await user.type(nameInput, "Test Group");
        await user.click(screen.getByRole("button", { name: "Create Group" }));

        // Verify form submission
        expect(mockCreateGroup).toHaveBeenCalledWith({
            name: "Test Group",
            privacy: false,
            canAddComments: true,
            groupSize: 100,
            admins: [],
        });
    });

    it("handles API error", async () => {
        const user = userEvent.setup();
        const mockCreateGroup = createGroup as jest.Mock;
        mockCreateGroup.mockResolvedValueOnce({
            status: "fail",
            message: "Error creating group",
        });

        render(<GroupDialog />);

        // Open dialog
        await user.click(screen.getByText("New Group"));

        // Fill and submit form
        const nameInput = screen.getByTestId("input-name");
        await user.type(nameInput, "Test Group");
        await user.click(screen.getByRole("button", { name: "Create Group" }));

        // Verify error message
        const errorMessage = await screen.findByText("Error creating group");
        expect(errorMessage).toBeInTheDocument();
    });

    it("resets form on successful submission", async () => {
        const user = userEvent.setup();
        const mockCreateGroup = createGroup as jest.Mock;
        mockCreateGroup.mockResolvedValueOnce({ status: "success" });

        render(<GroupDialog />);

        // Open dialog
        await user.click(screen.getByText("New Group"));

        // Fill and submit form
        const nameInput = screen.getByTestId("input-name");
        await user.type(nameInput, "Test Group");
        await user.click(screen.getByRole("button", { name: "Create Group" }));

        // Wait for form reset
        await waitFor(() => {
            expect(nameInput).toHaveValue("");
        });
    });
});
