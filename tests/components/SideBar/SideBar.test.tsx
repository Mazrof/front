// // import SideBar from "@/components/SideBar/SideBar";
// // import { render, screen } from "@testing-library/react";
// // import userEvent from "@testing-library/user-event";

// // jest.mock("../../../components/SideBar/ChatsList", () => {
// //     return function MockChatsList() {
// //         return <div data-testid="chats-list">Chats List</div>;
// //     };
// // });

// // jest.mock("../../../components/SideBar/ChatsSearchBar", () => {
// //     return function MockChatsSearchBar() {
// //         return <div data-testid="chats-search-bar">Chats SearchBar</div>;
// //     };
// // });

// // jest.mock("../../../components/SideBar/NewChatButton", () => {
// //     return function MockNewChatButton() {
// //         return <button data-testid="new-chat-button">New Chat</button>;
// //     };
// // });

// // describe("SideBar Component", () => {
// //     const mockProps = {
// //         darkMode: false,
// //         setDarkMode: jest.fn(),
// //         showContacts: false,
// //         setShowContacts: jest.fn(),
// //         handleSelectChat: jest.fn(),
// //     };

// //     describe("Render", () => {
// //         it("renders all child components correctly", () => {
// //             render(<SideBar {...mockProps} />);
// //             expect(screen.getByTestId("chats-search-bar")).toBeInTheDocument();
// //             expect(screen.getByTestId("chats-list")).toBeInTheDocument();
// //             expect(screen.getByTestId("new-chat-button")).toBeInTheDocument();
// //         });
// //     });

// //     describe("Behavior", () => {
// //         it("calls setShowContacts when changing contact view", async () => {
// //             render(<SideBar {...mockProps} />);
// //             const newChatButton = screen.getByTestId("new-chat-button");
// //             await userEvent.click(newChatButton);
// //             expect(mockProps.setShowContacts).toHaveBeenCalled();
// //         });

// //         it("calls setDarkMode when dark mode is toggled", async () => {
// //             const darkModeProps = { ...mockProps, darkMode: true };
// //             render(<SideBar {...darkModeProps} />);
// //             expect(darkModeProps.setDarkMode).not.toHaveBeenCalled();

// //             // Simulating some interaction
// //             const newChatButton = screen.getByTestId("new-chat-button");
// //             await userEvent.click(newChatButton);
// //             expect(darkModeProps.setDarkMode).toHaveBeenCalled();
// //         });
// //     });

// //     describe("Conditional Rendering", () => {
// //         it("hides the sidebar when a chat is selected", () => {
// //             render(<SideBar {...mockProps} showContacts={true} />);
// //             const sideBarDiv = screen.getByTestId("chats-search-bar").parentElement;
// //             expect(sideBarDiv).toHaveClass("hidden");
// //         });

// //         it("shows the sidebar when no chat is selected", () => {
// //             render(<SideBar {...mockProps} showContacts={false} />);
// //             const sideBarDiv = screen.getByTestId("chats-search-bar").parentElement;
// //             expect(sideBarDiv).not.toHaveClass("hidden");
// //         });
// //     });
// // });
// import React from "react";
// import { render } from "@testing-library/react";
// import SideBar from "../../../components/SideBar";

// describe("SideBar Component", () => {
//     const mockProps = {
//         darkMode: false,
//         setDarkMode: jest.fn(),
//         showContacts: false,
//         setShowContacts: jest.fn(),
//         handleSelectChat: jest.fn(),
//     };

//     it("renders SideBar correctly", () => {
//         const { container } = render(<SideBar {...mockProps} />);
//         expect(container).toMatchSnapshot();
//     });
// });
