import { render, screen } from "@testing-library/react";
import ChannelChats from "@/components/Channels/ChannelChats/ChannelChats";
import { useSelectedChatRoom } from "@/store/user";
import { ChannelData } from "@/types/channel";
import "@testing-library/jest-dom";

// Mock useSelectedChatRoom
jest.mock("@/store/user", () => ({
    useSelectedChatRoom: jest.fn(),
}));

jest.mock("@/components/Chats/InputMessage/InputMessage", () => () => (
    <div data-testid="input-message" />
));
jest.mock(
    "@/components/Chats/InfoChatBar",
    () =>
        ({ name, imageURL }: { name: string; imageURL: string }) => (
            <div data-testid="info-chat-bar">
                <span>{name}</span>
                <img src={imageURL} alt="chat-image" />
            </div>
        )
);
jest.mock("@/components/Chats/UploadingAlert", () => () => <div data-testid="uploading-alert" />);
jest.mock("@/components/Chats/ChatLayout", () => () => <div data-testid="chat-layout" />);
jest.mock(
    "../ChannelDropDownMenu",
    () =>
        ({ channelId, inviteLink }: { channelId: string; inviteLink: string }) => (
            <div data-testid="channel-dropdown-menu">
                <span>{channelId}</span>
                <span>{inviteLink}</span>
            </div>
        )
);

describe("ChannelChats Component", () => {
    it("renders loading state when selectedChatRoom is undefined", () => {
        (useSelectedChatRoom as jest.Mock).mockReturnValue({ selectedChatRoom: null });
        render(<ChannelChats />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders all child components when selectedChatRoom is defined", () => {
        const mockChannel: ChannelData = {
            id: "123",
            invitationLink: "https://invite.com",
            community: {
                name: "Test Community",
                privacy: "public",
                imageURL: "https://image.com",
            },
            canAddComments: true,
        };

        const mockSelectedChatRoom = { channel: mockChannel };
        (useSelectedChatRoom as jest.Mock).mockReturnValue({
            selectedChatRoom: mockSelectedChatRoom,
        });

        render(<ChannelChats />);

        // InfoChatBar
        expect(screen.getByTestId("info-chat-bar")).toBeInTheDocument();
        expect(screen.getByText("Test Community")).toBeInTheDocument();
        expect(screen.getByAltText("chat-image")).toHaveAttribute("src", "https://image.com");

        // ChannelDropDownMenu
        expect(screen.getByTestId("channel-dropdown-menu")).toBeInTheDocument();
        expect(screen.getByText("123")).toBeInTheDocument();
        expect(screen.getByText("https://invite.com")).toBeInTheDocument();

        // UploadingAlert
        expect(screen.getByTestId("uploading-alert")).toBeInTheDocument();

        // ChatLayout
        expect(screen.getByTestId("chat-layout")).toBeInTheDocument();

        // InputMessage
        expect(screen.getByTestId("input-message")).toBeInTheDocument();
    });
});
