import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChannelDropDownMenu from "../../../components/Channels/ChannelDropDownMenu";
import { addMembersToChannel } from "../../../services/Channel";
import { toast } from "../../../hooks/use-toast";

// Mock the dependencies
jest.mock("../../../services/Channel", () => ({
    addMembersToChannel: jest.fn(),
}));

jest.mock("../../../hooks/use-toast", () => ({
    toast: jest.fn(),
}));

// Mock the dialog components
jest.mock("../../../components/Channels/AddAdmins", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        isOpen ? <div role="dialog">Add Admins Dialog</div> : null
    ),
}));

jest.mock("../../../components/Channels/ChannelSettings", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        isOpen ? <div role="dialog">Channel Settings Dialog</div> : null
    ),
}));

jest.mock("../../../components/Channels/InviteLink", () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        isOpen ? <div role="dialog">Invite Link Dialog</div> : null
    ),
}));

describe("ChannelDropDownMenu", () => {
    const defaultProps = {
        channelId: 1,
        inviteLink: "https://example.com/invite/123",
        canAddComments: true,
        privacy: true,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the dropdown menu trigger", () => {
        render(<ChannelDropDownMenu {...defaultProps} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("shows menu items when clicked", async () => {
        render(<ChannelDropDownMenu {...defaultProps} />);
        
        // Click the trigger button
        const triggerButton = screen.getByRole("button");
        await userEvent.click(triggerButton);

        // Check if all menu items are visible
        expect(screen.getByText("Add Admins")).toBeInTheDocument();
        expect(screen.getByText("Join Channel")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Invite Link")).toBeInTheDocument();
        expect(screen.getByText("Forward Message")).toBeInTheDocument();
    });

    it("opens AddAdmins dialog when clicking Add Admins", async () => {
        render(<ChannelDropDownMenu {...defaultProps} />);
        
        // Open dropdown and click Add Admins
        await userEvent.click(screen.getByRole("button"));
        await userEvent.click(screen.getByText("Add Admins"));

        // Verify dialog is opened
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
            expect(screen.getByText("Add Admins Dialog")).toBeInTheDocument();
        });
    });

    it("opens Settings dialog when clicking Settings", async () => {
        render(<ChannelDropDownMenu {...defaultProps} />);
        
        // Open dropdown and click Settings
        await userEvent.click(screen.getByRole("button"));
        await userEvent.click(screen.getByText("Settings"));

        // Verify dialog is opened
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
            expect(screen.getByText("Channel Settings Dialog")).toBeInTheDocument();
        });
    });

    it("opens Invite Link dialog when clicking Invite Link", async () => {
        render(<ChannelDropDownMenu {...defaultProps} />);
        
        // Open dropdown and click Invite Link
        await userEvent.click(screen.getByRole("button"));
        await userEvent.click(screen.getByText("Invite Link"));

        // Verify dialog is opened
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
            expect(screen.getByText("Invite Link Dialog")).toBeInTheDocument();
        });
    });

    describe("Join Channel functionality", () => {
        it("handles successful channel join", async () => {
            (addMembersToChannel as jest.Mock).mockResolvedValue({
                status: "success",
            });

            render(<ChannelDropDownMenu {...defaultProps} />);
            
            // Click Join Channel
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(screen.getByText("Join Channel"));

            await waitFor(() => {
                expect(addMembersToChannel).toHaveBeenCalledWith(
                    { role: "member" },
                    defaultProps.channelId
                );
                expect(toast).toHaveBeenCalledWith({
                    title: "Joined Successfully",
                    description: "You have successfully joined the channel.",
                    duration: 5000,
                });
            });
        });

        it("handles failed channel join", async () => {
            const errorMessage = "Failed to join channel";
            (addMembersToChannel as jest.Mock).mockResolvedValue({
                status: "fail",
                message: errorMessage,
            });

            render(<ChannelDropDownMenu {...defaultProps} />);
            
            // Click Join Channel
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(screen.getByText("Join Channel"));

            await waitFor(() => {
                expect(addMembersToChannel).toHaveBeenCalledWith(
                    { role: "member" },
                    defaultProps.channelId
                );
                expect(toast).toHaveBeenCalledWith({
                    title: "Error Joining Channel",
                    description: errorMessage,
                    duration: 5000,
                });
            });
        });

        it("handles unexpected errors", async () => {
            (addMembersToChannel as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

            render(<ChannelDropDownMenu {...defaultProps} />);
            
            // Click Join Channel
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(screen.getByText("Join Channel"));

            await waitFor(() => {
                expect(toast).toHaveBeenCalledWith({
                    title: "Unexpected Error",
                    description: "An unexpected error occurred. Please try again.",
                    duration: 5000,
                });
            });
        });
    });
});
