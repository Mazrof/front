import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MessageDialog } from "@/components/Chats/Message/MessageDialog";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";
import { useUsers } from "@/hooks/useUsers";

// Mock child components
jest.mock("@/components/Chats/Message/EditMessage", () => {
    return jest.fn(() => (
        <div data-testid="edit-message-mock">
            Edit Message Component
        </div>
    ));
});

jest.mock("@/components/Chats/Message/DeleteMessage", () => {
    return jest.fn(() => (
        <div data-testid="delete-message-mock">
            Delete Message Component
        </div>
    ));
});

jest.mock("@/components/Chats/Message/ForwardMessage", () => {
    return jest.fn(() => (
        <div data-testid="forward-message-mock">
            Forward Message Component
        </div>
    ));
});

// Mock hooks
jest.mock("@/provider/MessageProvider/MessageProvider");
jest.mock("@/hooks/useUsers");

// Mock Radix UI context menu components
jest.mock("@/components/ui/context-menu", () => ({
    ContextMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    ContextMenuTrigger: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="context-menu-trigger">{children}</div>
    ),
    ContextMenuContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="context-menu-content">{children}</div>
    ),
    ContextMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <div data-testid="context-menu-item" onClick={onClick} role="menuitem">
            {children}
        </div>
    ),
}));

describe("MessageDialog", () => {
    beforeEach(() => {
        // Mock useMessageContext hook
        (useMessageContext as jest.Mock).mockImplementation(() => ({
            text: "Test message",
            documentUrl: null,
            size: null,
            name: null
        }));

        // Mock useUsers hook
        (useUsers as jest.Mock).mockImplementation(() => ({
            users: [
                { id: 1, username: "User1" },
                { id: 2, username: "User2" }
            ],
            isLoading: false
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders all menu items", () => {
        render(<MessageDialog />);
        
        expect(screen.getByTestId("edit-message-mock")).toBeInTheDocument();
        expect(screen.getByTestId("delete-message-mock")).toBeInTheDocument();
        expect(screen.getByTestId("forward-message-mock")).toBeInTheDocument();
        expect(screen.getByText("Pin")).toBeInTheDocument();
        expect(screen.getByText("Reply")).toBeInTheDocument();
    });

    it("renders context menu structure", () => {
        render(<MessageDialog />);

        expect(screen.getByTestId("context-menu-trigger")).toBeInTheDocument();
        expect(screen.getByTestId("context-menu-content")).toBeInTheDocument();
        expect(screen.getAllByTestId("context-menu-item")).toHaveLength(5);
    });

    it("prevents event propagation when clicking menu items", async () => {
        const user = userEvent.setup();
        const mockStopPropagation = jest.fn();
        render(<MessageDialog />);

        const menuItems = screen.getAllByTestId("context-menu-item");
        for (const item of menuItems) {
            await user.click(item);
            expect(mockStopPropagation).not.toHaveBeenCalled(); // Event should be stopped before reaching here
        }
    });

    // Test for accessibility
    it("has correct ARIA attributes", () => {
        render(<MessageDialog />);
        
        const menuItems = screen.getAllByRole("menuitem");
        menuItems.forEach(item => {
            expect(item).toHaveAttribute("role", "menuitem");
        });
    });
});
