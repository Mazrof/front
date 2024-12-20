import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddAdmins from "../../../components/Channels/AddAdmins";
import { useChannelMembers } from "../../../hooks/useChannelMembers";
import { addAdminsToChannel } from "../../../services/Channel";
import { ReactElement } from "react";
// Mock the hooks and services
jest.mock("../../../hooks/useChannelMembers");
jest.mock("../../../services/Channel");

// Mock the UI components
jest.mock("../../../components/ui/dialog", () => ({
    Dialog: ({
        children,
        open,
        onOpenChange,
    }: {
        children: ReactElement;
        open: boolean;
        onOpenChange: (arg: boolean) => void;
    }) =>
        open ? (
            <div data-testid="dialog" onClick={() => onOpenChange?.(false)}>
                {children}
            </div>
        ) : null,
    DialogContent: ({ children }: { children: ReactElement }) => (
        <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: { children: ReactElement }) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogFooter: ({ children }: { children: ReactElement }) => (
        <div data-testid="dialog-footer">{children}</div>
    ),
    DialogClose: ({ children, asChild }: { children: ReactElement; asChild: boolean }) =>
        asChild ? children : <div data-testid="dialog-close">{children}</div>,
}));

jest.mock("../../../components/ui/button", () => ({
    Button: ({
        children,
        onClick,
        type,
        disabled,
    }: {
        children: ReactElement;
        onClick: () => void;
        type: "submit" | "button" | "reset";
        disabled: boolean;
    }) => (
        <button data-testid="button" onClick={onClick} type={type} disabled={disabled}>
            {children}
        </button>
    ),
}));

jest.mock("../../../components/ui/checkbox", () => ({
    Checkbox: ({
        id,
        checked,
        onCheckedChange,
    }: {
        id: number;
        checked: boolean;
        onCheckedChange: (arg: boolean) => void;
    }) => (
        <input
            type="checkbox"
            data-testid={`checkbox-${id}`}
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
        />
    ),
}));

describe("AddAdmins", () => {
    const mockOnClose = jest.fn();
    const defaultProps = {
        channelId: 123,
        isOpen: true,
        onClose: mockOnClose,
    };

    const mockMembers = [
        { userId: 1, users: { username: "user1" } },
        { userId: 2, users: { username: "user2" } },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useChannelMembers as jest.Mock).mockReturnValue({
            members: mockMembers,
            loading: false,
            error: null,
        });
        (addAdminsToChannel as jest.Mock).mockResolvedValue({ success: true });
    });

    it("renders loading state correctly", () => {
        (useChannelMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: true,
            error: null,
        });

        render(<AddAdmins {...defaultProps} />);
        expect(screen.getByText("Loading members...")).toBeInTheDocument();
    });

    it("renders error state correctly", () => {
        const errorMessage = "Failed to load members";
        (useChannelMembers as jest.Mock).mockReturnValue({
            members: [],
            loading: false,
            error: errorMessage,
        });

        render(<AddAdmins {...defaultProps} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("renders member list correctly", () => {
        render(<AddAdmins {...defaultProps} />);

        mockMembers.forEach((member) => {
            expect(screen.getByText(member.users.username)).toBeInTheDocument();
            expect(screen.getByTestId(`checkbox-member-${member.userId}`)).toBeInTheDocument();
        });
    });

    it("handles member selection correctly", async () => {
        render(<AddAdmins {...defaultProps} />);

        const checkbox = screen.getByTestId("checkbox-member-1");
        await userEvent.click(checkbox);

        const submitButton = screen.getByText("Submit");
        expect(submitButton).not.toBeDisabled();
    });

    it("shows validation error when submitting without selection", async () => {
        render(<AddAdmins {...defaultProps} />);

        const submitButton = screen.getByText("Submit");
        await userEvent.click(submitButton);

        expect(await screen.findByText("Please select at least one admin.")).toBeInTheDocument();
    });

    it("submits form with selected members correctly", async () => {
        render(<AddAdmins {...defaultProps} />);

        // Select a member
        const checkbox = screen.getByTestId("checkbox-member-1");
        await userEvent.click(checkbox);

        // Submit form
        const submitButton = screen.getByText("Submit");
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(addAdminsToChannel).toHaveBeenCalledWith(
                {
                    admins: [
                        {
                            userId: 1,
                            role: "admin",
                            hasDownloadPermissions: false,
                        },
                    ],
                },
                123
            );
        });

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("handles form submission error correctly", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        (addAdminsToChannel as jest.Mock).mockRejectedValue(new Error("Submission failed"));

        render(<AddAdmins {...defaultProps} />);

        // Select a member
        const checkbox = screen.getByTestId("checkbox-member-1");
        await userEvent.click(checkbox);

        // Submit form
        const submitButton = screen.getByText("Submit");
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                "Failed to add admins:",
                expect.any(Error)
            );
        });

        consoleErrorSpy.mockRestore();
    });

    it("closes dialog when cancel button is clicked", async () => {
        render(<AddAdmins {...defaultProps} />);

        const cancelButton = screen.getByText("Cancel");
        await userEvent.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
});
