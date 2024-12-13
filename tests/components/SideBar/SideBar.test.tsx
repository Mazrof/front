/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */

import SideBar from "@/components/SideBar/SideBar";
import { useSettingsPageType } from "@/store/settings";
import { SettingsPageName } from "@/types/settings";
import { fireEvent, render, screen } from "@testing-library/react";

// Mocking child components
jest.mock("../../../components/SideBar/ChatsSearchBar", () => () => (
    <div data-testid="chats-search-bar">Search Bar</div>
));
jest.mock("../../../components/SideBar/ChatsList", () => () => <div data-testid="chats-list">Chats List</div>);
jest.mock("../../../components/SideBar/NewChatButton", () => () => (
    <div data-testid="new-chat-button">New Chat Button</div>
));


// jest.mock("../../../store/settings", () => ({
//     useSettingsPageType: jest.fn(),
// }));
jest.mock("../../../store/settings", () => ({
    useSettingsPageType: jest.fn(() => ({
        settingPageName: null, // Default value for the page name
        setPageName: jest.fn(), // Mocked function for setting the page name
    })) as unknown as jest.Mock<SettingsPageName>, // Casting to avoid type mismatch
}));
describe("SideBar Component", () => {
    const mockSetChat = jest.fn();
    const mockSetDarkMode = jest.fn();
    const mockSetShowContacts = jest.fn();
    const mockSetShowGlobalSearch = jest.fn();

    beforeEach(() => {
        // Reset mocks before each test
        mockSetChat.mockReset();
        mockSetDarkMode.mockReset();
        mockSetShowContacts.mockReset();
        mockSetShowGlobalSearch.mockReset();

        // Mock hook returns
        

        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            settingPageName: "", // Default: no settings page selected
        });
    });

    it("should render the SideBar correctly", () => {
        render(
            <SideBar
                darkMode={false}
                setDarkMode={mockSetDarkMode}
                showContacts={true}
                setShowContacts={mockSetShowContacts}
                showGlobalSearch={false}
                setShowGlobalSearch={mockSetShowGlobalSearch}
                
            />
        );

        // Check for the correct rendering of child components
        expect(screen.getByTestId("chats-search-bar")).toBeInTheDocument();
        expect(screen.getByTestId("chats-list")).toBeInTheDocument();
        expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
    });

    it("should hide the SideBar when a settings page is active", () => {
        // Mock hook to simulate a settings page being active
        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            settingPageName: "settingsPage", // Simulate settings page is active
        });

        render(
            <SideBar
                darkMode={false}
                setDarkMode={mockSetDarkMode}
                showContacts={true}
                setShowContacts={mockSetShowContacts}
                showGlobalSearch={false}
                setShowGlobalSearch={mockSetShowGlobalSearch}
                
            />
        );

        // The sidebar should not render its main content when `settingPageName` is set
        expect(screen.queryByTestId("chats-search-bar")).not.toBeInTheDocument();
        expect(screen.queryByTestId("chats-list")).not.toBeInTheDocument();
        expect(screen.queryByTestId("new-chat-button")).not.toBeInTheDocument();
    });

    it("should render the SideBar again when settings page is not active", () => {
        // Mock hook to simulate no active settings page
        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            settingPageName: null, // No settings page active
        });

        render(
            <SideBar
                darkMode={false}
                setDarkMode={mockSetDarkMode}
                showContacts={true}
                setShowContacts={mockSetShowContacts}
                showGlobalSearch={false}
                setShowGlobalSearch={mockSetShowGlobalSearch}
                
            />
        );

        // The sidebar should render its main content again
        expect(screen.getByTestId("chats-search-bar")).toBeInTheDocument();
        expect(screen.getByTestId("chats-list")).toBeInTheDocument();
        expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
    });

   
   
});
