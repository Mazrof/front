import ChatList from "@/components/SideBar/ChatsList"; // Adjust path if necessary
import { useSelectedChatId } from "@/store/user";
import { fireEvent, render, screen } from "@testing-library/react";

// Mocking the useSelectedChatId hook
jest.mock("../../../store/user", () => ({
    useSelectedChatId: jest.fn(),
}));

// Mocking the Avatar component
jest.mock("../../../components/SideBar/Avatar", () => {
    return jest.fn(({ name }) => <div data-testid={`avatar-mock-${name}`}>Avatar</div>);
});

describe("ChatList", () => {
    const mockSetChatId = jest.fn();

    beforeEach(() => {
        (useSelectedChatId as unknown as jest.Mock).mockReturnValue({ setChatId: mockSetChatId });
    });

    const chatsList = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://example.com/avatar1.jpg",
            time: "10:30 AM",
            lastMessage: "Hey, how are you?",
            unreadCount: 2,
            pinned: false,
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "",
            time: "9:00 AM",
            lastMessage: "Let's catch up soon!",
            unreadCount: 0,
            pinned: false,
        },
    ];

    test("renders chat list correctly", () => {
        render(<ChatList chatsList={chatsList} />);

        // Check if chat names are rendered
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();

        // Check if chat times are rendered
        expect(screen.getByText("10:30 AM")).toBeInTheDocument();
        expect(screen.getByText("9:00 AM")).toBeInTheDocument();

        // Check if the last messages are rendered
        expect(screen.getByText("Hey, how are you?")).toBeInTheDocument();
        expect(screen.getByText("Let's catch up soon!")).toBeInTheDocument();
    });

    test("renders unread count badge when unreadCount is greater than 0", () => {
        render(<ChatList chatsList={chatsList} />);

        // Check if the unread count badge is displayed for John Doe
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    test("renders image avatar for chats with avatar", () => {
        render(<ChatList chatsList={chatsList} />);

        // Ensure the avatar mock is rendered for John Doe
        expect(screen.getByTestId("avatar-mock-John Doe")).toBeInTheDocument();
    });

    test("calls setChatId when a chat item is clicked", () => {
        render(<ChatList chatsList={chatsList} />);

        // Click on the first chat (John Doe)
        fireEvent.click(screen.getByText("John Doe"));

        // Check if the setChatId function is called with the correct argument
        expect(mockSetChatId).toHaveBeenCalledWith("1");
    });
});
