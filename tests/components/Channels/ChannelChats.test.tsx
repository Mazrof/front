import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChannelChats from "../../../components/Channels/ChannelChats/ChannelChats";
import { useSelectedChatRoom } from "../../../store/user";
import { ReactElement } from "react";

// Mock the dependencies
jest.mock("../../../store/user", () => ({
    useSelectedChatRoom: jest.fn(),
}));

jest.mock("../../../components/Chats/InputMessage/UploadingAlert", () => ({
    UploadingAlert: () => <div data-testid="uploading-alert">Uploading Alert</div>,
}));

jest.mock("../../../components/Chats/InputMessage/InputMessage", () => ({
    __esModule: true,
    default: () => <div data-testid="input-message">Input Message</div>,
}));

jest.mock("../../../components/Chats/InfoChatBar", () => ({
    __esModule: true,
    default: ({
        children,
        name,
        imageURL,
    }: {
        children: ReactElement;
        name: string;
        imageURL: string;
    }) => (
        <div data-testid="info-chat-bar">
            <span>Name: {name}</span>
            <span>Image URL: {imageURL}</span>
            {children}
        </div>
    ),
}));

jest.mock("../../../components/Chats/ChatLayout", () => ({
    __esModule: true,
    default: () => <div data-testid="chat-layout">Chat Layout</div>,
}));

jest.mock("../../../components/Channels/ChannelDropDownMenu", () => ({
    __esModule: true,
    default: ({ channelId, inviteLink, privacy, canAddComments }) => (
        <div data-testid="channel-dropdown-menu">
            <span>Channel ID: {channelId}</span>
            <span>Invite Link: {inviteLink}</span>
            <span>Privacy: {privacy}</span>
            <span>Can Add Comments: {String(canAddComments)}</span>
        </div>
    ),
}));

describe("ChannelChats", () => {
    const mockSelectedChatRoom = {
        selectedChatRoom: {
            channel: {
                id: "123",
                invitationLink: "https://invite.link",
                community: {
                    name: "Test Channel",
                    privacy: "public",
                    imageURL: "https://test.image.url",
                },
                canAddComments: true,
            },
        },
    };

    beforeEach(() => {
        (useSelectedChatRoom as jest.Mock).mockReturnValue(mockSelectedChatRoom);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading state when selectedChatRoom is not available", () => {
        (useSelectedChatRoom as jest.Mock).mockReturnValue({ selectedChatRoom: null });
        render(<ChannelChats />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders all components when selectedChatRoom is available", () => {
        render(<ChannelChats />);

        // Check if all components are rendered
        expect(screen.getByTestId("info-chat-bar")).toBeInTheDocument();
        expect(screen.getByTestId("uploading-alert")).toBeInTheDocument();
        expect(screen.getByTestId("chat-layout")).toBeInTheDocument();
        expect(screen.getByTestId("input-message")).toBeInTheDocument();
        expect(screen.getByTestId("channel-dropdown-menu")).toBeInTheDocument();
    });

    it("passes correct props to InfoChatBar", () => {
        render(<ChannelChats />);
        const infoChatBar = screen.getByTestId("info-chat-bar");
        expect(infoChatBar).toHaveTextContent("Name: Test Channel");
        expect(infoChatBar).toHaveTextContent("Image URL: https://test.image.url");
    });

    it("passes correct props to ChannelDropDownMenu", () => {
        render(<ChannelChats />);
        const dropdownMenu = screen.getByTestId("channel-dropdown-menu");
        expect(dropdownMenu).toHaveTextContent("Channel ID: 123");
        expect(dropdownMenu).toHaveTextContent("Invite Link: https://invite.link");
        expect(dropdownMenu).toHaveTextContent("Privacy: public");
        expect(dropdownMenu).toHaveTextContent("Can Add Comments: true");
    });

    it("renders InputMessage with correct placeholder", () => {
        render(<ChannelChats />);
        expect(screen.getByTestId("input-message")).toBeInTheDocument();
    });
});
