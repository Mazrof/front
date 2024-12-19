import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditMessage from "@/components/Chats/Message/EditMessage";
import { z } from "zod";

// Mock react-hook-form
jest.mock("react-hook-form", () => ({
    useForm: () => ({
        register: (name: string) => ({
            name,
            onChange: jest.fn(),
            onBlur: jest.fn(),
            ref: jest.fn(),
            value: name === "messageText" ? "Original message text" : "",
        }),
        handleSubmit: (onSubmit: any) => (e: any) => {
            e.preventDefault();
            const formData = { messageText: screen.getByTestId("edit-message-input").value };
            onSubmit(formData);
        },
        formState: {
            errors: {
                messageText: {
                    message: "Message can't be Empty"
                }
            },
            isSubmitting: true,
        },
        reset: jest.fn(),
    }),
}));

// Mock MessageProvider
jest.mock("@/provider/MessageProvider/MessageProvider", () => ({
    useMessageContext: () => ({
        text: "Original message text",
        type: "text",
        file: null,
        image: null,
    }),
}));

// Mock the dialog components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => (
        <div data-testid="dialog" data-state={open ? "open" : "closed"}>
            {children}
        </div>
    ),
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-trigger">
            {children}
        </div>
    ),
    DialogContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div data-testid="dialog-content" role="dialog" className={className}>
            {children}
        </div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogFooter: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div data-testid="dialog-footer" className={className}>
            {children}
        </div>
    ),
    DialogClose: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => (
        <div data-testid="dialog-close" data-asChild={asChild}>
            {children}
        </div>
    ),
}));

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick, disabled, type = "button", variant, className, "data-test": dataTest }: any) => (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            data-variant={variant}
            className={className}
            data-testid={dataTest}
        >
            {children}
        </button>
    ),
}));

// Mock the Input component
jest.mock("@/components/ui/input", () => ({
    Input: ({ id, placeholder, className, "data-test": dataTest, onChange, value, ...props }: any) => (
        <input
            id={id}
            placeholder={placeholder}
            className={className}
            data-testid={dataTest}
            onChange={onChange}
            value={value || "Original message text"}
            {...props}
        />
    ),
}));

// Mock the Label component
jest.mock("@/components/ui/label", () => ({
    Label: ({ children, htmlFor, className }: any) => (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    ),
}));

// Mock Loader2 component
jest.mock("lucide-react", () => ({
    Loader2: () => <div data-testid="loader" className="mr-2 h-4 w-4 animate-spin">Loading...</div>,
}));

// Mock MessageImage component
jest.mock("@/components/Chats/Message/MessageImage", () => ({
    MessageImage: () => <div data-testid="message-image">Message Image</div>,
}));

describe("EditMessage", () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Spy on console methods
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("renders edit button initially", () => {
        render(<EditMessage />);
        
        const editButton = screen.getByRole("button", { name: "Edit Message" });
        expect(editButton).toBeInTheDocument();
        expect(editButton).toHaveAttribute("data-variant", "ghost");
    });

    it("opens dialog with original message text when edit button is clicked", async () => {
        const user = userEvent.setup();
        render(<EditMessage />);

        // Click edit button
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Check if dialog content is shown
        const dialog = screen.getByTestId("dialog-content");
        expect(dialog).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Edit Message" })).toBeInTheDocument();
        
        // Check if input has original text
        const input = screen.getByTestId("edit-message-input");
        expect(input).toHaveValue("Original message text");
    });

    it("shows error when submitting empty message", async () => {
        const user = userEvent.setup();
        
        // Mock useForm to return error state
        jest.spyOn(require("react-hook-form"), "useForm").mockImplementation(() => ({
            register: () => ({}),
            handleSubmit: (onSubmit: any) => (e: any) => {
                e.preventDefault();
                onSubmit({ messageText: "" });
            },
            formState: {
                errors: {
                    messageText: {
                        message: "Message can't be Empty"
                    }
                },
                isSubmitting: false,
            },
            reset: jest.fn(),
        }));

        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Submit empty form
        await user.click(screen.getByTestId("edit-submitButton"));

        // Check error message
        const errorMessage = screen.getByText("Message can't be Empty");
        expect(errorMessage).toBeInTheDocument();
    });

    it("handles successful message edit", async () => {
        const user = userEvent.setup();

        // Mock useForm to handle successful edit
        jest.spyOn(require("react-hook-form"), "useForm").mockImplementation(() => ({
            register: () => ({
                onChange: jest.fn(),
                onBlur: jest.fn(),
                ref: jest.fn(),
            }),
            handleSubmit: (onSubmit: any) => (e: any) => {
                e.preventDefault();
                onSubmit({ messageText: "Updated message text" });
            },
            formState: {
                errors: {},
                isSubmitting: false,
            },
            reset: jest.fn(),
        }));

        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Submit form
        await user.click(screen.getByTestId("edit-submitButton"));

        // Check if success message is logged and dialog is closed
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith("Edited message text:", "Updated message text");
            expect(screen.getByTestId("dialog")).toHaveAttribute("data-state", "closed");
        });
    });

    it("handles edit error", async () => {
        const user = userEvent.setup();
        
        // Mock console.log to throw an error
        jest.spyOn(console, "log").mockImplementationOnce(() => {
            throw new Error("Edit failed");
        });

        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Edit message
        const input = screen.getByTestId("edit-message-input");
        await user.clear(input);
        await user.type(input, "Updated message text");

        // Submit form
        await user.click(screen.getByTestId("edit-submitButton"));

        // Check if error message is logged
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Failed to edit the message.");
        });
    });

    it("closes dialog when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));
        
        // Verify dialog is open
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        // Click cancel button
        const cancelButton = screen.getByTestId("edit-cancelButton");
        await user.click(cancelButton);

        // Verify dialog is closed
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-state", "closed");
    });

    it("shows loading state during submission", async () => {
        const user = userEvent.setup();

        // Mock useForm to return loading state
        jest.spyOn(require("react-hook-form"), "useForm").mockImplementation(() => ({
            register: () => ({}),
            handleSubmit: (onSubmit: any) => (e: any) => {
                e.preventDefault();
                onSubmit({ messageText: "test" });
            },
            formState: {
                errors: {},
                isSubmitting: true,
            },
            reset: jest.fn(),
        }));

        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Submit form to trigger loading state
        await user.click(screen.getByTestId("edit-submitButton"));

        // Check loading state
        expect(screen.getByTestId("loader")).toBeInTheDocument();
        expect(screen.getByText("Editing...")).toBeInTheDocument();
    });

    it("shows MessageImage component", async () => {
        const user = userEvent.setup();
        render(<EditMessage />);

        // Open dialog
        await user.click(screen.getByRole("button", { name: "Edit Message" }));

        // Check if MessageImage is rendered
        expect(screen.getByTestId("message-image")).toBeInTheDocument();
    });

    // Test accessibility
    it("has correct ARIA attributes", async () => {
        const user = userEvent.setup();
        render(<EditMessage />);

        // Check edit button
        const editButton = screen.getByRole("button", { name: "Edit Message" });
        expect(editButton).toHaveAttribute("type", "button");

        // Open dialog
        await user.click(editButton);

        // Check dialog role
        expect(screen.getByRole("dialog")).toBeInTheDocument();

        // Check input label association
        const input = screen.getByTestId("edit-message-input");
        const label = screen.getByText("Message Text");
        expect(input).toHaveAttribute("id", "messageText");
        expect(label).toHaveAttribute("for", "messageText");
    });
});
