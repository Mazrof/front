import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddAdmins from "@/components/Groups/AddMember";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import { addAdminsToGroup } from "@/services/Group";

// Mock the hooks and services
jest.mock("@/hooks/useGroupMembers");
jest.mock("@/services/Group");

// Mock the Dialog components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog">{children}</div>
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

// Mock the Checkbox component
jest.mock("@/components/ui/checkbox", () => ({
    Checkbox: ({
        onCheckedChange,
        id,
    }: {
        onCheckedChange: (checked: boolean) => void;
        id: string;
    }) => (
        <input
            type="checkbox"
            onChange={(e) => onCheckedChange(e.target.checked)}
            data-testid={`checkbox-${id}`}
        />
    ),
}));

describe("AddAdmins", () => {
    const mockMembers = [
        { id: 1, userId: 1, firstName: "John", lastName: "Doe", role: "member" },
        { id: 2, userId: 2, firstName: "Jane", lastName: "Smith", role: "member" },
    ];

    const defaultProps = {
        groupId: 123,
        isOpen: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: mockMembers,
            loading: false,
            error: null,
        });
        (addAdminsToGroup as jest.Mock).mockResolvedValue({ success: true });
    });

    it("renders loading state correctly", () => {
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: true,
            error: null,
        });

        render(<AddAdmins {...defaultProps} />);
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("renders error state correctly", () => {
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: false,
            error: "Failed to load members",
        });

        render(<AddAdmins {...defaultProps} />);
        expect(screen.getByText("Failed to load members")).toBeInTheDocument();
    });

    it("renders member list correctly", () => {
        render(<AddAdmins {...defaultProps} />);

        mockMembers.forEach((member) => {
            expect(screen.getByText(`${member.firstName} ${member.lastName}`)).toBeInTheDocument();
            expect(screen.getByTestId(`checkbox-${member.userId}`)).toBeInTheDocument();
        });
    });

    it("handles member selection correctly", async () => {
        const user = userEvent.setup();
        render(<AddAdmins {...defaultProps} />);

        const checkbox = screen.getByTestId("checkbox-1");
        await user.click(checkbox);

        // Submit form
        await user.click(screen.getByRole("button", { name: /add admin/i }));

        expect(addAdminsToGroup).toHaveBeenCalledWith(123, [
            { userId: 1, role: "admin", hasDownloadPermissions: false },
        ]);
    });

    it("shows validation error when no members selected", async () => {
        const user = userEvent.setup();
        render(<AddAdmins {...defaultProps} />);

        // Try to submit without selecting any members
        await user.click(screen.getByRole("button", { name: /add admin/i }));

        await waitFor(() => {
            expect(screen.getByText("Please select at least one admin.")).toBeInTheDocument();
        });
    });

    it("closes dialog on successful submission", async () => {
        const user = userEvent.setup();
        render(<AddAdmins {...defaultProps} />);

        // Select a member and submit
        await user.click(screen.getByTestId("checkbox-1"));
        await user.click(screen.getByRole("button", { name: /add admin/i }));

        await waitFor(() => {
            expect(defaultProps.onClose).toHaveBeenCalled();
        });
    });

    it("handles API error correctly", async () => {
        const user = userEvent.setup();
        (addAdminsToGroup as jest.Mock).mockRejectedValue(new Error("API Error"));

        render(<AddAdmins {...defaultProps} />);

        // Select a member and submit
        await user.click(screen.getByTestId("checkbox-1"));
        await user.click(screen.getByRole("button", { name: /add admin/i }));

        await waitFor(() => {
            expect(screen.getByText("Failed to add admins")).toBeInTheDocument();
        });
    });
});
