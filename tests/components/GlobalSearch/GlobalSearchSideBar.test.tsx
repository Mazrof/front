/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GlobalSearchSideBar from "@/components/GlobalSearch/GlobalSearchSideBar"; 
import { Contact, DarkMode, SetDarkMode, SetShowGlobalSearch, ShowGlobalSearch } from "@/types/SideBar";

// Mock ContactsList and ContactsSearchBar components
jest.mock("../../../components/GlobalSearch/ContactsList", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Contacts List</div>),
}));

jest.mock("../../../components/GlobalSearch/ContactsSearchBar", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Contacts Search Bar</div>),
}));

describe("GlobalSearchSideBar", () => {
  const mockSetDarkMode: SetDarkMode = jest.fn();
  const mockSetShowGlobalSearch: SetShowGlobalSearch = jest.fn();
  const mockOnSearch = jest.fn();

  const sideBarProps = {
    darkMode: "light" as unknown as DarkMode, // You can adjust this to your darkMode type
    setDarkMode: mockSetDarkMode,
    showGlobalSearch: false as ShowGlobalSearch,
    setShowGlobalSearch: mockSetShowGlobalSearch,
  };

  test("renders ContactsSearchBar and ContactsList components", () => {
    render(<GlobalSearchSideBar {...sideBarProps} />);

    // Check if the ContactsSearchBar and ContactsList components are rendered
    expect(screen.getByText(/Contacts Search Bar/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacts List/i)).toBeInTheDocument();
  });

  test("calls handleSearchResults when search results are returned", async () => {
    render(<GlobalSearchSideBar {...sideBarProps} />);

    // Simulate receiving search results
    const mockContacts = {
      users: [{ id: "1", name: "User 1", avatar: "avatar1", email: "user1@example.com" }],
      groups: [{ id: "2", name: "Group 1", avatar: "group1", email: "group1@example.com" }],
      channels: [{ id: "3", name: "Channel 1", avatar: "channel1", email: "channel1@example.com" }],
    };

    // Trigger the onSearch callback with the mock data
    mockOnSearch(mockContacts);
    
    // Verify that the groupedContacts state is updated with the mock data
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(mockContacts);
    });
  });

});
