import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageFile from "@/components/Chats/Message/MessageFile";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";

// Get the mocked hook
jest.mock("@/provider/MessageProvider/MessageProvider");

describe("MessageFile", () => {
    const mockCreateElement = document.createElement.bind(document);
    const mockClick = jest.fn();
    let mockAnchor: { href: string; download: string; click: () => void };

    beforeEach(() => {
        // Reset the mock implementation
        (useMessageContext as jest.Mock).mockImplementation(() => ({
            documentUrl: "https://example.com/test.pdf",
            size: "1.2 MB",
            name: "test.pdf"
        }));

        // Create mock anchor element
        mockAnchor = {
            href: "",
            download: "",
            click: mockClick
        };

        // Mock document.createElement for the download link
        document.createElement = jest.fn().mockImplementation((tagName) => {
            if (tagName === "a") {
                return mockAnchor;
            }
            return mockCreateElement(tagName);
        });
    });

    afterEach(() => {
        document.createElement = mockCreateElement;
        jest.clearAllMocks();
    });

    it("renders file information correctly", () => {
        render(<MessageFile />);

        // Check if file name is displayed
        expect(screen.getByText("test.pdf")).toBeInTheDocument();
        
        // Check if file size is displayed
        expect(screen.getByText("1.2 MB")).toBeInTheDocument();
        
        // Check if download button is present
        expect(screen.getByRole("button", { name: /download file/i })).toBeInTheDocument();
        
        // Check if download text is present
        expect(screen.getByText("Download")).toBeInTheDocument();
    });

    it("initiates download when clicked", async () => {
        const user = userEvent.setup();
        render(<MessageFile />);

        // Click the file container
        await user.click(screen.getByRole("button", { name: /download file/i }));

        // Verify download link was created and clicked
        expect(document.createElement).toHaveBeenCalledWith("a");
        expect(mockClick).toHaveBeenCalled();
        expect(mockAnchor.href).toBe("https://example.com/test.pdf");
        expect(mockAnchor.download).toBe("test.pdf");
    });

    it("does not render when documentUrl is not provided", () => {
        // Override the mock to return no documentUrl
        (useMessageContext as jest.Mock).mockImplementationOnce(() => ({
            size: "1.2 MB",
            name: "test.pdf"
        }));

        render(<MessageFile />);

        // Check that the component is not rendered
        expect(screen.queryByText("test.pdf")).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /download file/i })).not.toBeInTheDocument();
    });

    it("uses 'file' as default download name when name is not provided", async () => {
        // Override the mock to return no name
        (useMessageContext as jest.Mock).mockImplementationOnce(() => ({
            documentUrl: "https://example.com/test.pdf",
            size: "1.2 MB"
        }));

        const user = userEvent.setup();
        render(<MessageFile />);

        // Click the file container
        await user.click(screen.getByRole("button", { name: /download file/i }));

        expect(mockAnchor.download).toBe("file");
    });

    it("displays file extension correctly", () => {
        render(<MessageFile />);

        // Check if file name without extension is displayed
        expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("has correct accessibility attributes", () => {
        render(<MessageFile />);

        const fileButton = screen.getByRole("button", { name: /download file/i });
        expect(fileButton).toHaveAttribute("role", "button");
        expect(fileButton).toHaveAttribute("aria-label", "Download file");
    });
});
