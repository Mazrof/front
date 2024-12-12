/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable react/display-name */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactsList from "@/components/Contacts/ContactsList";
import { useSelectedChatId } from "@/store/user";
import { getContactsList } from "@/services/Contacts/Contacts";

// Mock dependencies
jest.mock("../../../store/user", () => ({
  useSelectedChatId: jest.fn(),
}));

jest.mock("../../../services/Contacts/Contacts", () => ({
  getContactsList: jest.fn(),
}));

jest.mock("../../../components/SideBar/Avatar", () => () => <div data-testid="avatar">Mock Avatar</div>);

describe("ContactsList Component", () => {
  const mockSetChatId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSelectedChatId as unknown as jest.Mock).mockReturnValue({
      setChatId: mockSetChatId,
    });
  });

  it("renders the list of contacts with valid avatars", async () => {
    (getContactsList as jest.Mock).mockResolvedValue([
      { id: "1", name: "Contact 1", avatar: "http://valid-url.com/avatar1.jpg" },
      { id: "2", name: "Contact 2", avatar: "http://valid-url.com/avatar2.jpg" },
    ]);

    render(<ContactsList />);

    await waitFor(() => {
      expect(screen.getByText("Contact 1")).toBeInTheDocument();
      expect(screen.getByText("Contact 2")).toBeInTheDocument();
    });

    // Check that the Image component is rendered for valid avatars
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  

  it("handles click events and calls setChatId with the correct ID", async () => {
    (getContactsList as jest.Mock).mockResolvedValue([
      { id: "1", name: "Contact 1", avatar: "http://valid-url.com/avatar1.jpg" },
    ]);

    render(<ContactsList />);

    const contact = await screen.findByText("Contact 1");
    fireEvent.click(contact);

    expect(mockSetChatId).toHaveBeenCalledWith("1");
  });

  it("renders a message when no contacts are found", async () => {
    (getContactsList as jest.Mock).mockResolvedValue([]);

    render(<ContactsList />);

    await waitFor(() => {
      expect(screen.getByText("No contacts found.")).toBeInTheDocument();
    });
  });
});
