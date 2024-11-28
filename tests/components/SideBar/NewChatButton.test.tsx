// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import NewChatButton from "../../../components/NewChatButton";

// describe("NewChatButton Component", () => {
//     it("toggles menu visibility on button click", () => {
//         const { getByRole, queryByText } = render(<NewChatButton />);
//         const button = getByRole("button");

//         // Initially menu is not visible
//         expect(queryByText("New Channel")).not.toBeInTheDocument();

//         // Simulate button click
//         fireEvent.click(button);

//         // Menu becomes visible
//         expect(queryByText("New Channel")).toBeInTheDocument();

//         // Simulate another click
//         fireEvent.click(button);

//         // Menu should hide
//         expect(queryByText("New Channel")).not.toBeInTheDocument();
//     });
// });
