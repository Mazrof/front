// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import ChatsSearchBar from "../../../components/ChatsSearchBar";

// describe("ChatsSearchBar Component", () => {
//     const mockProps = {
//         setDarkMode: jest.fn(),
//         showContacts: false,
//         setShowContacts: jest.fn(),
//     };

//     it("renders ChatsSearchBar correctly", () => {
//         const { getByPlaceholderText } = render(<ChatsSearchBar {...mockProps} />);
//         expect(getByPlaceholderText("Search")).toBeInTheDocument();
//     });

//     it("calls setShowContacts on Contacts button click", () => {
//         const { getByText } = render(<ChatsSearchBar {...mockProps} />);
//         const contactsButton = getByText("Contacts");
//         fireEvent.click(contactsButton);
//         expect(mockProps.setShowContacts).toHaveBeenCalled();
//     });
// });
