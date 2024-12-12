/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import ContactsSideBar from "@/components/Contacts/ContactsSideBar";
import { DarkMode, SetDarkMode, ShowContacts, SetShowContacts } from "@/types/SideBar";

describe("ContactsSideBar", () => {
  const mockSetDarkMode: SetDarkMode = jest.fn();
  const mockSetShowContacts: SetShowContacts = jest.fn();

  const defaultProps = {
    darkMode: false,
    setDarkMode: mockSetDarkMode,
    showContacts: true,
    setShowContacts: mockSetShowContacts,
  };

  it("renders correctly", () => {
    render(<ContactsSideBar {...defaultProps} />);

    // Ensure that ContactsSearchBar and ContactsList are rendered
    expect(screen.getByPlaceholderText("Search Contacts")).toBeInTheDocument();

    // Ensure that the Contacts list message is correctly rendered
    expect(screen.getByText("No contacts found.")).toBeInTheDocument(); // Updated text
  });

  it("calls setShowContacts when the back arrow button is clicked", () => {
    render(<ContactsSideBar {...defaultProps} />);

    // Find the button with the back arrow (adjust the role or text if needed)
    const button = screen.getByRole("button", { name: /back arrow/i });

    // Simulate click on the back arrow button
    fireEvent.click(button);

    // Ensure that setShowContacts is called with the correct toggled value
    expect(mockSetShowContacts).toHaveBeenCalledWith(false); // Assuming this toggles the state to false
  });

});
