// __tests__/NewChatButton.test.tsx

import NewChatButton from "@/components/SideBar/NewChatButton";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
    ),
}));

// Mock images folder
jest.mock("public/images/pen.gif", () => "/images/pen.gif");

describe("NewChatButton Component", () => {
    it("should render the pen image initially", () => {
        render(<NewChatButton />);

        const penImage = screen.getByAltText("pen image");
        expect(penImage).toBeInTheDocument();
        expect(penImage).toHaveAttribute("src", "/images/pen.gif");
    });

    it("should toggle menu and display correct icons", () => {
        render(<NewChatButton />);

        // Initial state: menu closed, pen icon displayed
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(screen.getByAltText("pen image")).toBeInTheDocument();

        // Simulate click to open menu
        fireEvent.click(button);

        // Verify the "X" icon appears
        const xIcon = screen.getByLabelText("close icon");
        expect(xIcon).toBeInTheDocument();
        expect(screen.queryByAltText("pen image")).not.toBeInTheDocument();

        // Simulate another click to close the menu
        fireEvent.click(button);
        expect(screen.getByAltText("pen image")).toBeInTheDocument();
    });

    it("should display the popup menu when open", () => {
        render(<NewChatButton />);

        const button = screen.getByRole("button");
        fireEvent.click(button); // Open the menu

        // Verify popup menu items
        const menuItems = screen.getAllByRole("listitem");
        expect(menuItems).toHaveLength(3);
        expect(menuItems[0]).toHaveTextContent("New Channel");
        expect(menuItems[1]).toHaveTextContent("New Group");
        expect(menuItems[2]).toHaveTextContent("New Message");
    });
});
