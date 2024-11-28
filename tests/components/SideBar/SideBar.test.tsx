// // // import SideBar from "@/components/SideBar/SideBar";
// // // import { render, screen } from "@testing-library/react";
// // // import userEvent from "@testing-library/user-event";

// // // jest.mock("../../../components/SideBar/ChatsList", () => {
// // //     return function MockChatsList() {
// // //         return <div data-testid="chats-list">Chats List</div>;
// // //     };
// // // });

// // // jest.mock("../../../components/SideBar/ChatsSearchBar", () => {
// // //     return function MockChatsSearchBar() {
// // //         return <div data-testid="chats-search-bar">Chats SearchBar</div>;
// // //     };
// // // });

// // // jest.mock("../../../components/SideBar/NewChatButton", () => {
// // //     return function MockNewChatButton() {
// // //         return <button data-testid="new-chat-button">New Chat</button>;
// // //     };
// // // });

// // // describe("SideBar Component", () => {
// // //     const mockProps = {
// // //         darkMode: false,
// // //         setDarkMode: jest.fn(),
// // //         showContacts: false,
// // //         setShowContacts: jest.fn(),
// // //         handleSelectChat: jest.fn(),
// // //     };

// // //     describe("Render", () => {
// // //         it("renders all child components correctly", () => {
// // //             render(<SideBar {...mockProps} />);
// // //             expect(screen.getByTestId("chats-search-bar")).toBeInTheDocument();
// // //             expect(screen.getByTestId("chats-list")).toBeInTheDocument();
// // //             expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
// // //         });
// // //     });

// // //     describe("Behavior", () => {
// // //         it("calls setShowContacts when changing contact view", async () => {
// // //             render(<SideBar {...mockProps} />);
// // //             const newChatButton = screen.getByTestId("new-chat-button");
// // //             await userEvent.click(newChatButton);
// // //             expect(mockProps.setShowContacts).toHaveBeenCalled();
// // //         });

// // //         it("calls setDarkMode when dark mode is toggled", async () => {
// // //             const darkModeProps = { ...mockProps, darkMode: true };
// // //             render(<SideBar {...darkModeProps} />);
// // //             expect(darkModeProps.setDarkMode).not.toHaveBeenCalled();

// // //             // Simulating some interaction
// // //             const newChatButton = screen.getByTestId("new-chat-button");
// // //             await userEvent.click(newChatButton);
// // //             expect(darkModeProps.setDarkMode).toHaveBeenCalled();
// // //         });
// // //     });

// // //     describe("Conditional Rendering", () => {
// // //         it("hides the sidebar when a chat is selected", () => {
// // //             render(<SideBar {...mockProps} showContacts={true} />);
// // //             const sideBarDiv = screen.getByTestId("chats-search-bar").parentElement;
// // //             expect(sideBarDiv).toHaveClass("hidden");
// // //         });

// // //         it("shows the sidebar when no chat is selected", () => {
// // //             render(<SideBar {...mockProps} showContacts={false} />);
// // //             const sideBarDiv = screen.getByTestId("chats-search-bar").parentElement;
// // //             expect(sideBarDiv).not.toHaveClass("hidden");
// // //         });
// // //     });
// // // });
// // import React from "react";
// // import { render } from "@testing-library/react";
// // import SideBar from "../../../components/SideBar";

// // describe("SideBar Component", () => {
// //     const mockProps = {
// //         darkMode: false,
// //         setDarkMode: jest.fn(),
// //         showContacts: false,
// //         setShowContacts: jest.fn(),
// //         handleSelectChat: jest.fn(),
// //     };

// //     it("renders SideBar correctly", () => {
// //         const { container } = render(<SideBar {...mockProps} />);
// //         expect(container).toMatchSnapshot();
// //     });
// // });
// import { render, screen, fireEvent } from "@testing-library/react";
// import SideBar from "@/components/SideBar/SideBar"; // Import your SideBar component
// import { useSelectedChatId } from "@/store/user"; // Assuming the context hooks
// import { useSettingsPageType } from "@/store/settings";
// import { DarkMode, ShowContacts, ShowGlobalSearch, SetChat } from "@/types/SideBar";

// // Mocking child components
// jest.mock("./ChatsSearchBar", () => () => <div data-testid="chats-search-bar">Search Bar</div>);
// jest.mock("./ChatsList", () => () => <div data-testid="chats-list">Chats List</div>);
// jest.mock("./NewChatButton", () => () => <div data-testid="new-chat-button">New Chat Button</div>);

// // Mocking hooks
// jest.mock("@/store/user", () => ({
//   useSelectedChatId: jest.fn(),
// }));

// jest.mock("@/store/settings", () => ({
//   useSettingsPageType: jest.fn(),
// }));

// describe("SideBar Component", () => {
//   // Initial mock values for context
//   const mockSetChat = jest.fn();
//   const mockSetDarkMode = jest.fn();
//   const mockSetShowContacts = jest.fn();
//   const mockSetShowGlobalSearch = jest.fn();
  
//   beforeEach(() => {
//     // Reset mocks before each test
//     mockSetChat.mockReset();
//     mockSetDarkMode.mockReset();
//     mockSetShowContacts.mockReset();
//     mockSetShowGlobalSearch.mockReset();
    
//     // Mock hook returns
//     (useSelectedChatId as unknown as jest.Mock).mockReturnValue({
//       isSelectedChatId: jest.fn().mockReturnValue(false), // Mock as false
//     });

//     (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
//       settingPageName: "", // Mock with an empty string, meaning no settings page
//     });
//   });

//   it("should render the SideBar correctly", () => {
//     render(
//       <SideBar
//         darkMode={false}
//         setDarkMode={mockSetDarkMode}
//         showContacts={true}
//         setShowContacts={mockSetShowContacts}
//         showGlobalSearch={false}
//         setShowGlobalSearch={mockSetShowGlobalSearch}
//         handleSelectChat={mockSetChat}
//       />
//     );
    
//     // Check for the correct rendering of child components
//     expect(screen.getByTestId("chats-search-bar")).toBeInTheDocument();
//     expect(screen.getByTestId("chats-list")).toBeInTheDocument();
//     expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
//   });

//   it("should render the New Chat button only when the user is not in a selected chat", () => {
//     render(
//       <SideBar
//         darkMode={false}
//         setDarkMode={mockSetDarkMode}
//         showContacts={true}
//         setShowContacts={mockSetShowContacts}
//         showGlobalSearch={false}
//         setShowGlobalSearch={mockSetShowGlobalSearch}
//         handleSelectChat={mockSetChat}
//       />
//     );
    
//     // When `isSelectedChatId` returns false, the New Chat button should be visible
//     expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
//   });

//   it("should hide the SideBar when settingPageName is provided", () => {
//     // Change the mock return for settingPageName
//     (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
//       settingPageName: "settingsPage", // Simulating the settings page is active
//     });

//     render(
//       <SideBar
//         darkMode={false}
//         setDarkMode={mockSetDarkMode}
//         showContacts={true}
//         setShowContacts={mockSetShowContacts}
//         showGlobalSearch={false}
//         setShowGlobalSearch={mockSetShowGlobalSearch}
//         handleSelectChat={mockSetChat}
//       />
//     );

//     // If `settingPageName` is set, the sidebar should not be visible (hidden)
//     expect(screen.queryByTestId("chats-search-bar")).toBeNull();
//     expect(screen.queryByTestId("chats-list")).toBeNull();
//     expect(screen.queryByTestId("new-chat-button")).toBeNull();
//   });

//   it("should toggle global search visibility when clicked", () => {
//     render(
//       <SideBar
//         darkMode={false}
//         setDarkMode={mockSetDarkMode}
//         showContacts={true}
//         setShowContacts={mockSetShowContacts}
//         showGlobalSearch={false}
//         setShowGlobalSearch={mockSetShowGlobalSearch}
//         handleSelectChat={mockSetChat}
//       />
//     );

//     // Initially, `showGlobalSearch` should be false (as per the prop)
//     expect(mockSetShowGlobalSearch).not.toHaveBeenCalled();
    
//     // Click on the global search (here assuming you have an element that triggers it)
//     fireEvent.click(screen.getByTestId("chats-search-bar"));
    
//     // Verify if the `setShowGlobalSearch` function was called to toggle the search
//     expect(mockSetShowGlobalSearch).toHaveBeenCalled();
//   });

//   it("should correctly call handleSelectChat when a chat is selected", () => {
//     render(
//       <SideBar
//         darkMode={false}
//         setDarkMode={mockSetDarkMode}
//         showContacts={true}
//         setShowContacts={mockSetShowContacts}
//         showGlobalSearch={false}
//         setShowGlobalSearch={mockSetShowGlobalSearch}
//         handleSelectChat={mockSetChat}
//       />
//     );

//     // Simulate chat selection (for now just make sure the handler is called)
//     fireEvent.click(screen.getByTestId("chats-list"));
    
//     // Check if handleSelectChat is called
//     expect(mockSetChat).toHaveBeenCalled();
//   });
// });
