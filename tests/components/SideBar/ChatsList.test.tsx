// import React from "react";
// import { render } from "@testing-library/react";
// import ChatList from "../../../components/ChatList";

// jest.mock("../../../services/Contacts/Contacts", () => ({
//     getChatsList: jest.fn().mockResolvedValue([
//         { id: "1", name: "John Doe", avatar: "/path/to/avatar.jpg", lastMessage: "Hello!", time: "12:30", unreadCount: 1, pinned: false },
//         { id: "2", name: "Jane Doe", avatar: "/path/to/avatar.jpg", lastMessage: "Hi!", time: "12:31", unreadCount: 0, pinned: true },
//     ]),
// }));

// describe("ChatList Component", () => {
//     it("renders ChatList correctly", async () => {
//         const { findByText } = render(<ChatList />);
//         expect(await findByText("John Doe")).toBeInTheDocument();
//         expect(await findByText("Jane Doe")).toBeInTheDocument();
//     });
// });
