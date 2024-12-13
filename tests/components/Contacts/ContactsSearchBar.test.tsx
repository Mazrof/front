import { render, screen, fireEvent } from "@testing-library/react";
import ContactsSearchBar from "@/components/Contacts/ContactsSearchBar";
import { ShowContacts, SetShowContacts } from "@/types/SideBar";

// Mock the functions
const mockSetShowContacts: SetShowContacts = jest.fn();
const mockShowContacts: ShowContacts = true;

describe("ContactsSearchBar Component", () => {
    it("renders correctly", () => {
        render(<ContactsSearchBar showContacts={mockShowContacts} setShowContacts={mockSetShowContacts} />);
        expect(screen.getByPlaceholderText("Search Contacts")).toBeInTheDocument();
    });

    it("calls setShowContacts when the back arrow is clicked", () => {
        render(<ContactsSearchBar showContacts={mockShowContacts} setShowContacts={mockSetShowContacts} />);
        
        // Use the aria-label to find the button
        const button = screen.getByRole("button", { name: /back arrow/i });
        
        fireEvent.click(button);
        
        // Ensure that the setShowContacts function was called with the correct value
        expect(mockSetShowContacts).toHaveBeenCalledWith(false); // Toggled to false from true
    });

    it("toggles the showContacts state when the button is clicked", () => {
        render(<ContactsSearchBar showContacts={mockShowContacts} setShowContacts={mockSetShowContacts} />);
        
        // Simulate click on the back arrow button using the aria-label
        const button = screen.getByRole("button", { name: /back arrow/i });
        fireEvent.click(button);
        
        // Ensure that the setShowContacts function was called with the correct toggled value
        expect(mockSetShowContacts).toHaveBeenCalledWith(false); // Toggled state
    });
});
