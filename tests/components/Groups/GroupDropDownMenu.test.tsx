import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupDropDownMenu from "@/components/Groups/GroupDropDownMenu";
import { addMembersToGroup } from "@/services/Group";
import { toast } from "@/hooks/use-toast";

// Mock the services and hooks
jest.mock("@/services/Group");
jest.mock("@/hooks/use-toast");

// Mock the child components
jest.mock("@/components/Groups/AddAdmins", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <div data-testid="add-admins" data-open={isOpen}>
            {isOpen && <button onClick={onClose}>Close</button>}
        </div>
    ),
}));

jest.mock("@/components/Groups/GroupSettings", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <div data-testid="group-settings" data-open={isOpen}>
            {isOpen && <button onClick={onClose}>Close</button>}
        </div>
    ),
}));

jest.mock("@/components/Groups/GroupMembersList", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <div data-testid="members-list" data-open={isOpen}>
            {isOpen && <button onClick={onClose}>Close</button>}
        </div>
    ),
}));

jest.mock("@/components/Groups/MuteNotification", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        <div data-testid="mute-notification" data-open={isOpen}>
            {isOpen && <button onClick={onClose}>Close</button>}
        </div>
    ),
}));

// Mock the UI components
jest.mock("@/components/ui/dropdown-menu", () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dropdown-content">{children}</div>
    ),
    DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button onClick={onClick} data-testid="dropdown-item">
            {children}
        </button>
    ),
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
        <button data-testid="dropdown-trigger">{children}</button>
    ),
}));

describe("GroupDropDownMenu", () => {
    const defaultProps = {
        groupId: 123,
        groupSize: 10,
        privacy: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (addMembersToGroup as jest.Mock).mockResolvedValue({ status: "success" });
    });

    it("renders dropdown menu with trigger", () => {
        render(<GroupDropDownMenu {...defaultProps} />);
        expect(screen.getByTestId("dropdown-trigger")).toBeInTheDocument();
    });

    it("opens AddAdmins dialog when clicking add admins option", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/add admins/i));
        expect(screen.getByTestId("add-admins")).toHaveAttribute("data-open", "true");
    });

    it("opens GroupSettings dialog when clicking settings option", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/settings/i));
        expect(screen.getByTestId("group-settings")).toHaveAttribute("data-open", "true");
    });

    it("opens GroupMembersList dialog when clicking members option", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/members/i));
        expect(screen.getByTestId("members-list")).toHaveAttribute("data-open", "true");
    });

    it("opens MuteNotification dialog when clicking mute notifications option", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/mute notifications/i));
        expect(screen.getByTestId("mute-notification")).toHaveAttribute("data-open", "true");
    });

    it("handles successful group join", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/join group/i));

        await waitFor(() => {
            expect(addMembersToGroup).toHaveBeenCalledWith({ role: "member" }, defaultProps.groupId);
            expect(toast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Joined Successfully",
                })
            );
        });
    });

    it("handles failed group join", async () => {
        const user = userEvent.setup();
        (addMembersToGroup as jest.Mock).mockResolvedValue({
            status: "fail",
            message: "Failed to join group",
        });

        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/join group/i));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Error Joining Group",
                    description: "Failed to join group",
                })
            );
        });
    });

    it("handles unexpected error during group join", async () => {
        const user = userEvent.setup();
        (addMembersToGroup as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

        render(<GroupDropDownMenu {...defaultProps} />);

        await user.click(screen.getByText(/join group/i));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Unexpected Error",
                })
            );
        });
    });

    it("closes dialogs when close button is clicked", async () => {
        const user = userEvent.setup();
        render(<GroupDropDownMenu {...defaultProps} />);

        // Open and close AddAdmins dialog
        await user.click(screen.getByText(/add admins/i));
        await user.click(screen.getByText("Close"));
        expect(screen.getByTestId("add-admins")).toHaveAttribute("data-open", "false");

        // Open and close GroupSettings dialog
        await user.click(screen.getByText(/settings/i));
        await user.click(screen.getByText("Close"));
        expect(screen.getByTestId("group-settings")).toHaveAttribute("data-open", "false");
    });
});
