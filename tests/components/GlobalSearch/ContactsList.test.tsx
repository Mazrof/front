import { render, screen, fireEvent } from "@testing-library/react";
import ContactsList from "@/components/GlobalSearch/ContactsList"; // Adjust the import path
import { useSelectedChatId } from "@/store/user"; // Adjusted the import path

jest.mock("../../../store/user", () => ({
  useSelectedChatId: jest.fn(),
}));

describe("ContactsList", () => {
  const mockSetShowGlobalSearch = jest.fn();
  const mockSetChatId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
    (useSelectedChatId as unknown as jest.Mock).mockReturnValue({ setChatId: mockSetChatId });
  });

  // Define the Contact type
  type Contact = {
    id: number;
    name: string;
    phone: number;
    avatar: string;
    email: string;
  };

  // Assign type explicitly to defaultContacts
  const defaultContacts: Contact[] = [
    { id: 1, name: "User 1", phone: 123-456-7890, avatar: "avatar1.png", email: "user1@example.com" },
    { id: 2, name: "User 2", phone: 987-654-3210, avatar: "avatar2.png", email: "user2@example.com" },
    { id: 3, name: "Group 1",phone: 123-456-7890, avatar: "group1.png", email: "group1@example.com" }, // Optional phone
    { id: 4, name: "Group 2",phone: 987-654-3210, avatar: "group2.png", email: "group2@example.com" }, // Optional phone
    { id: 5, name: "Channel 1",phone: 123-456-7890, avatar: "channel1.png", email: "channel1@example.com" }, // Optional phone
    { id: 6, name: "Channel 2",phone: 987-654-3210, avatar: "channel2.png", email: "channel2@example.com" }, // Optional phone
  ];

  test("renders correctly with users, groups, and channels", () => {
    render(
      <ContactsList
        groupedContacts={{
          users: [defaultContacts[0], defaultContacts[1]],
          groups: [defaultContacts[2], defaultContacts[3]],
          channels: [defaultContacts[4], defaultContacts[5]],
        }}
        setShowGlobalSearch={mockSetShowGlobalSearch}
        showGlobalSearch={false}
      />
    );

    // Check if individual contacts (users, groups, channels) are rendered
    expect(screen.getByText(/User 1/i)).toBeInTheDocument();
    expect(screen.getByText(/User 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Group 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Group 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Channel 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Channel 2/i)).toBeInTheDocument();
  });

  test("calls handleSelect when a contact is clicked", () => {
    render(
      <ContactsList
        groupedContacts={{
          users: [defaultContacts[0], defaultContacts[1]],
          groups: [defaultContacts[2], defaultContacts[3]],
          channels: [defaultContacts[4], defaultContacts[5]],
        }}
        setShowGlobalSearch={mockSetShowGlobalSearch}
        showGlobalSearch={false}
      />
    );

    // Simulate clicking on a user
    const userElement = screen.getByText(/User 1/i);
    fireEvent.click(userElement);

    // Ensure that setChatId was called with the correct id
    expect(mockSetChatId).toHaveBeenCalledWith("1");
  });

  test("displays 'No contacts found' when there are no users, groups, or channels", () => {
    render(
      <ContactsList
        groupedContacts={{
          users: [],
          groups: [],
          channels: [],
        }}
        setShowGlobalSearch={mockSetShowGlobalSearch}
        showGlobalSearch={false}
      />
    );

    // Check if "No contacts found" message is rendered
    expect(screen.getByText(/No contacts found/i)).toBeInTheDocument();
  });

  test("calls setShowGlobalSearch when a contact is clicked", () => {
    render(
      <ContactsList
        groupedContacts={{
          users: [defaultContacts[0], defaultContacts[1]],
          groups: [defaultContacts[2], defaultContacts[3]],
          channels: [defaultContacts[4], defaultContacts[5]],
        }}
        setShowGlobalSearch={mockSetShowGlobalSearch}
        showGlobalSearch={false}
      />
    );

    // Simulate clicking a user and check if setShowGlobalSearch is toggled
    const userElement = screen.getByText(/User 1/i);
    fireEvent.click(userElement);

    // Check if setShowGlobalSearch was called with the opposite value
    expect(mockSetShowGlobalSearch).toHaveBeenCalledWith(true); // Adjust based on the toggle logic
  });
});
