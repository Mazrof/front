import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupSettings from "@/components/Groups/GroupSettings";
import { updateGroupSettings } from "@/services/Group";

// Mock the services
jest.mock("@/services/Group");

// Mock the UI components
jest.mock("@/components/ui/dialog", () => ({
    Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
        <div data-testid="dialog" data-open={open}>
            {children}
        </div>
    ),
    DialogContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-content">{children}</div>
    ),
    DialogHeader: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-header">{children}</div>
    ),
    DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    DialogFooter: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-footer">{children}</div>
    ),
    DialogClose: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-close" onClick={() => {}}>
            {children}
        </div>
    ),
    DialogTrigger: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="dialog-trigger">{children}</div>
    ),
}));

jest.mock("@/components/ui/radio-group", () => ({
    RadioGroup: ({
        children,
        value,
        onValueChange,
    }: {
        children: React.ReactNode;
        value: string;
        onValueChange: (value: string) => void;
    }) => (
        <div
            data-testid="radio-group"
            data-value={value}
            onChange={(e) => onValueChange(e.target.value)}
        >
            {children}
        </div>
    ),
    RadioGroupItem: ({ value, id }: { value: string; id: string }) => (
        <input type="radio" value={value} id={id} />
    ),
}));

jest.mock("@/components/ui/button", () => ({
    Button: ({
        children,
        onClick,
        type,
    }: {
        children: React.ReactNode;
        onClick?: () => void;
        type?: string;
    }) => (
        <button onClick={onClick} type={type} data-testid="button">
            {children}
        </button>
    ),
}));

jest.mock("@/components/ui/input", () => ({
    Input: ({
        id,
        name,
        value,
        onChange,
    }: {
        id: string;
        name: string;
        value: string;
        onChange: (e) => void;
    }) => (
        <input id={id} name={name} value={value} onChange={onChange} data-testid={`input-${id}`} />
    ),
}));

jest.mock("@/components/ui/label", () => ({
    Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
        <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>
            {children}
        </label>
    ),
}));

describe("GroupSettings", () => {
    const defaultProps = {
        groupId: 123,
        privacy: false,
        groupSize: 10,
        isOpen: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (updateGroupSettings as jest.Mock).mockResolvedValue({ status: "success" });
    });

    it("renders with initial values", () => {
        render(<GroupSettings {...defaultProps} />);
        expect(screen.getByTestId("dialog")).toHaveAttribute("data-open", "true");
        expect(screen.getByText("Group Settings")).toBeInTheDocument();
    });

    it("handles form submission with valid data", async () => {
        const user = userEvent.setup();
        render(<GroupSettings {...defaultProps} />);

        // Fill form
        await user.type(screen.getByTestId("input-name"), "Test Group");
        await user.type(screen.getByTestId("input-groupSize"), "20");

        // Select privacy option
        const privacyRadio = screen.getByTestId("radio-group");
        await user.click(privacyRadio);

        // Submit form
        await user.click(screen.getByTestId("button"));

        await waitFor(() => {
            expect(updateGroupSettings).toHaveBeenCalledWith(defaultProps.groupId, {
                name: "Test Group",
                groupSize: 20,
                privacy: true,
                abilityToPost: "No One",
                downloadPermission: "No One",
            });
        });
    });

    it("displays validation errors for invalid input", async () => {
        const user = userEvent.setup();
        render(<GroupSettings {...defaultProps} />);

        // Submit without required fields
        await user.click(screen.getByTestId("button"));

        await waitFor(() => {
            expect(screen.getByText("Group name is required")).toBeInTheDocument();
        });
    });

    it("handles API error response", async () => {
        const user = userEvent.setup();
        (updateGroupSettings as jest.Mock).mockResolvedValue({
            status: "fail",
            message: "Failed to update settings",
        });

        render(<GroupSettings {...defaultProps} />);

        // Fill form with valid data
        await user.type(screen.getByTestId("input-name"), "Test Group");
        await user.type(screen.getByTestId("input-groupSize"), "20");

        // Submit form
        await user.click(screen.getByTestId("button"));

        await waitFor(() => {
            expect(screen.getByText("Failed to update settings")).toBeInTheDocument();
        });
    });

    it("handles unexpected errors", async () => {
        const user = userEvent.setup();
        (updateGroupSettings as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

        render(<GroupSettings {...defaultProps} />);

        // Fill form with valid data
        await user.type(screen.getByTestId("input-name"), "Test Group");
        await user.type(screen.getByTestId("input-groupSize"), "20");

        // Submit form
        await user.click(screen.getByTestId("button"));

        await waitFor(() => {
            expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
        });
    });

    it("closes dialog when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<GroupSettings {...defaultProps} />);

        await user.click(screen.getByText(/cancel/i));
        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("resets form on successful submission", async () => {
        const user = userEvent.setup();
        render(<GroupSettings {...defaultProps} />);

        // Fill form
        await user.type(screen.getByTestId("input-name"), "Test Group");
        await user.type(screen.getByTestId("input-groupSize"), "20");

        // Submit form
        await user.click(screen.getByTestId("button"));

        await waitFor(() => {
            expect(screen.getByTestId("input-name")).toHaveValue("");
            expect(screen.getByTestId("input-groupSize")).toHaveValue("");
        });
    });
});
