import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatsSearchBar from "@/components/SideBar/ChatsSearchBar";
import { SetDarkMode, SetShowContacts, ShowContacts, SetShowGlobalSearch, ShowGlobalSearch } from "@/types/SideBar";
import { useRouter } from "next/navigation";

// Mocking Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ChatsSearchBar", () => {
  const mockSetDarkMode: SetDarkMode = jest.fn();
  const mockSetShowContacts: SetShowContacts = jest.fn();
  const mockSetShowGlobalSearch: SetShowGlobalSearch = jest.fn();
  const mockRouterPush = jest.fn();

  const sideBarProps = {
    setDarkMode: mockSetDarkMode,
    showContacts: false as ShowContacts,
    setShowContacts: mockSetShowContacts,
    showGlobalSearch: false as ShowGlobalSearch,
    setShowGlobalSearch: mockSetShowGlobalSearch,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  test("renders ChatsSearchBar with logo and title", () => {
    render(<ChatsSearchBar {...sideBarProps} />);

    expect(screen.getByAltText("App Logo")).toBeInTheDocument();
    expect(screen.getByText("Mazrof")).toBeInTheDocument();
  });

  test("opens and closes menu", async () => {
    render(<ChatsSearchBar {...sideBarProps} />);

    // Open menu
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // Close menu by clicking again
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    });
  });

  test("navigates to 'Stories' page when Stories option is clicked", () => {
    render(<ChatsSearchBar {...sideBarProps} />);

    // Open menu
    fireEvent.click(screen.getByRole("button"));

    const storiesItem = screen.getByText("Stories");

    // Click on the Stories menu item
    fireEvent.click(storiesItem);

    expect(mockRouterPush).toHaveBeenCalledWith("/stories");
  });

  test("toggles contacts visibility when Contacts option is clicked", () => {
    render(<ChatsSearchBar {...sideBarProps} />);

    // Open menu
    fireEvent.click(screen.getByRole("button"));

    const contactsItem = screen.getByText("Contacts");

    // Click on Contacts menu item
    fireEvent.click(contactsItem);

    // Expect the mock function to be called with a function that toggles the value
    expect(mockSetShowContacts).toHaveBeenCalled();
  });

  test("toggles global search visibility when Global Search option is clicked", () => {
    render(<ChatsSearchBar {...sideBarProps} />);

    // Open menu
    fireEvent.click(screen.getByRole("button"));

    const globalSearchItem = screen.getByText("Global Search");

    // Click on Global Search menu item
    fireEvent.click(globalSearchItem);

    // Expect the mock function to be called with a function that toggles the value
    expect(mockSetShowGlobalSearch).toHaveBeenCalled();
  });
});
