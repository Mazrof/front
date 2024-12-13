/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactsSearchBar from "@/components/GlobalSearch/ContactsSearchBar";
import { sendQuery } from "@/services/Contacts/Contacts";

// Mocking the dependencies
jest.mock("../../../services/Contacts/Contacts", () => ({
sendQuery: jest.fn(),
}));

describe("ContactsSearchBar Component", () => {
const mockOnSearch = jest.fn();
const mockSetShowGlobalSearch = jest.fn();

beforeEach(() => {
jest.clearAllMocks();
});

it("renders correctly", () => {
render(
<ContactsSearchBar
showGlobalSearch={false}
setShowGlobalSearch={mockSetShowGlobalSearch}
onSearch={mockOnSearch}
/>
);

// Check if the search input and buttons are rendered
expect(screen.getByPlaceholderText("Search Contacts")).toBeInTheDocument();
expect(screen.getByRole("button", { name: /🔍/ })).toBeInTheDocument();
expect(screen.getByRole("button", { name: /back arrow/i })).toBeInTheDocument();
});

it("handles the search query correctly", async () => {
(sendQuery as jest.Mock).mockResolvedValue({
data: {
users: [
{
id: "1",
name: "User 1",
photo: "",
phone: "1234567890",
email: "user1@example.com",
},
],
groups: [],
channels: [],
},
});

render(
<ContactsSearchBar
showGlobalSearch={false}
setShowGlobalSearch={mockSetShowGlobalSearch}
onSearch={mockOnSearch}
/>
);

const input = screen.getByPlaceholderText("Search Contacts");
fireEvent.change(input, { target: { value: "User" } });

fireEvent.click(screen.getByRole("button", { name: /🔍/ }));

// Wait for the async query to finish and ensure onSearch is called
await waitFor(() => {
expect(mockOnSearch).toHaveBeenCalledWith({
users: [
{
id: "1",
name: "User 1",
avatar: "",
phone: "1234567890",
email: "user1@example.com",
},
],
groups: [],
channels: [],
});
});
});

it("handles empty query gracefully", async () => {
render(
<ContactsSearchBar
showGlobalSearch={false}
setShowGlobalSearch={mockSetShowGlobalSearch}
onSearch={mockOnSearch}
/>
);

const input = screen.getByPlaceholderText("Search Contacts");
fireEvent.change(input, { target: { value: "" } });

// The search button should be disabled when there's no query
expect(screen.getByRole("button", { name: /🔍/ })).toBeDisabled();
});

it("shows loading indicator when the query is being processed", async () => {
(sendQuery as jest.Mock).mockResolvedValue({
data: {
users: [{ id: "1", name: "User 1", photo: "", phone: "", email: "" }],
groups: [],
channels: [],
},
});

render(
<ContactsSearchBar
showGlobalSearch={false}
setShowGlobalSearch={mockSetShowGlobalSearch}
onSearch={mockOnSearch}
/>
);

const input = screen.getByPlaceholderText("Search Contacts");
fireEvent.change(input, { target: { value: "User" } });

fireEvent.click(screen.getByRole("button", { name: /🔍/ }));

// Ensure loading state is active
expect(screen.getByRole("button", { name: /🔄/ })).toBeInTheDocument();

// Wait for async operation to complete
await waitFor(() => {
expect(mockOnSearch).toHaveBeenCalled();
expect(screen.getByRole("button", { name: /🔍/ })).toBeInTheDocument();
});
});
});