import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupMembersDialog from "@/components/Groups/GroupMembersList";
import { useGroupMembers } from "@/hooks/useGroupMembers";

// Mock the hooks
jest.mock("@/hooks/useGroupMembers");

// Mock the UI components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: () => void }) => (
        <div data-testid="dialog" data-open={open} onClick={onOpenChange}>
            {children}
        </div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>,
    DialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-header">{children}</div>,
    DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    DialogFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-footer">{children}</div>,
}));

jest.mock("@/components/ui/skeleton", () => ({
    Skeleton: ({ className }: { className: string }) => <div data-testid="skeleton" className={className} />,
}));

describe("GroupMembersDialog", () => {
    const mockMembers = [
        { userId: 1, users: { username: "user1" } },
        { userId: 2, users: { username: "user2" } },
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
    });

    it("renders loading state correctly", () => {
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: true,
            error: null,
        });

        render(<GroupMembersDialog {...defaultProps} />);
        const skeletons = screen.getAllByTestId("skeleton");
        expect(skeletons).toHaveLength(5);
    });

    it("renders error state correctly", () => {
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: false,
            error: "Failed to load members",
        });

        render(<GroupMembersDialog {...defaultProps} />);
        expect(screen.getByText("Failed to load members")).toBeInTheDocument();
    });

    it("renders member list correctly", () => {
        render(<GroupMembersDialog {...defaultProps} />);

        mockMembers.forEach((member) => {
            expect(screen.getByText(member.users.username)).toBeInTheDocument();
        });
    });

    it("handles dialog close", async () => {
        const user = userEvent.setup();
        render(<GroupMembersDialog {...defaultProps} />);

        await user.click(screen.getByText("Close"));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("renders dialog with correct open state", () => {
        render(<GroupMembersDialog {...defaultProps} />);
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "true");

        render(<GroupMembersDialog {...defaultProps} isOpen={false} />);
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "false");
    });

    it("handles empty members list", () => {
        (useGroupMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: false,
            error: null,
        });

        render(<GroupMembersDialog {...defaultProps} />);
        const membersList = screen.queryByRole("list");
        expect(membersList).toBeInTheDocument();
        expect(membersList?.children).toHaveLength(0);
    });
});
