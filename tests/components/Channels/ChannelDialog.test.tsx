import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ChannelDialog from '../../../components/Channels/ChannelDialog';
import { useUsers } from '../../../hooks/useUsers';
import { createChannel } from '../../../services/Channel';

// Mock the hooks and services
jest.mock('../../../hooks/useUsers');
jest.mock('../../../services/Channel');

// Mock the UI components
jest.mock('../../../components/ui/dialog', () => ({
    Dialog: ({ children, open, onOpenChange }: any) => (
        <div data-testid="dialog">
            {children}
        </div>
    ),
    DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
    DialogHeader: ({ children }: any) => <div data-testid="dialog-header">{children}</div>,
    DialogFooter: ({ children }: any) => <div data-testid="dialog-footer">{children}</div>,
    DialogTrigger: ({ children }: any) => children,
    DialogClose: ({ children, asChild }: any) => asChild ? children : <div data-testid="dialog-close">{children}</div>,
}));

jest.mock('../../../components/ui/button', () => ({
    Button: ({ children, onClick, type, disabled, variant, className, 'data-test': dataTest }: any) => (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            data-variant={variant}
            className={className}
            data-testid={dataTest}
        >
            {children}
        </button>
    ),
}));

jest.mock('../../../components/ui/input', () => ({
    Input: ({ id, placeholder, className, 'data-test': dataTest, ...props }: any) => (
        <input
            id={id}
            placeholder={placeholder}
            className={className}
            data-testid={dataTest}
            {...props}
        />
    ),
}));

jest.mock('../../../components/ui/radio-group', () => ({
    RadioGroup: ({ children, onValueChange, defaultValue }: any) => (
        <div data-testid="radio-group" data-default-value={defaultValue} onChange={(e: any) => onValueChange(e.target.value)}>
            {children}
        </div>
    ),
    RadioGroupItem: ({ value, id, className, 'data-test': dataTest }: any) => (
        <input
            type="radio"
            value={value}
            id={id}
            className={className}
            data-testid={dataTest}
        />
    ),
}));

jest.mock('../../../components/ui/checkbox', () => ({
    Checkbox: ({ id, className, 'data-test': dataTest, value, ...props }: any) => (
        <input
            type="checkbox"
            id={id}
            className={className}
            data-testid={dataTest}
            value={value}
            {...props}
        />
    ),
}));

jest.mock('../../../components/ui/label', () => ({
    Label: ({ children, htmlFor, className }: any) => (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    ),
}));

describe('ChannelDialog', () => {
    const mockUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useUsers as jest.Mock).mockReturnValue({
            users: mockUsers,
            isLoading: false,
        });
        (createChannel as jest.Mock).mockResolvedValue({
            status: 'success',
            data: {
                channel: {
                    id: 1,
                    name: 'Test Channel',
                },
            },
        });
    });

    it('renders the dialog trigger button', () => {
        render(<ChannelDialog />);
        expect(screen.getByTestId('channel-createButton')).toBeInTheDocument();
    });

    it('renders loading state for users correctly', async () => {
        (useUsers as jest.Mock).mockReturnValue({
            users: [],
            isLoading: true,
        });
        render(<ChannelDialog />);
        
        // Click to open dialog
        await userEvent.click(screen.getByText('New Channel'));
        
        expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    it('displays validation errors for invalid input', async () => {
        render(<ChannelDialog />);
        
        // Open dialog by clicking New Channel button
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        // Try to submit with empty name
        const submitButton = screen.getByTestId('channel-createButton');
        await userEvent.click(submitButton);
        
        expect(await screen.findByText('Channel name must be at least 3 characters')).toBeInTheDocument();
    });

    it('handles successful channel creation', async () => {
        (createChannel as jest.Mock).mockResolvedValue({
            status: 'success',
            data: {
                channel: {
                    id: 1,
                    name: 'Test Channel',
                    privacy: true,
                    canAddComments: true,
                    admins: ['1'],
                }
            }
        });

        render(<ChannelDialog />);
        
        // Open dialog
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        // Fill form
        const nameInput = screen.getByLabelText('Channel Name');
        await userEvent.type(nameInput, 'Test Channel');

        // Select privacy
        const publicRadio = screen.getByLabelText('Public');
        await userEvent.click(publicRadio);
        
        // Toggle comments
        const commentsCheckbox = screen.getByLabelText('Allow comments in the channel');
        await userEvent.click(commentsCheckbox);
        
        // Select first admin
        const adminCheckbox = screen.getByLabelText('user1');
        await userEvent.click(adminCheckbox);
        
        // Submit form
        const submitButton = screen.getByRole('button', { name: /Create Channel|Creating.../ });
        await userEvent.click(submitButton);
        
        await waitFor(() => {
            expect(createChannel).toHaveBeenCalledWith({
                name: 'Test Channel',
                privacy: true,
                canAddComments: true,
                admins: ['1'],
            });
            // Dialog should be closed
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    it('handles failed channel creation', async () => {
        const errorMessage = 'Failed to create channel';
        (createChannel as jest.Mock).mockResolvedValue({
            status: 'fail',
            message: errorMessage,
        });

        render(<ChannelDialog />);
        
        // Open dialog
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        // Fill form with minimal required data
        const nameInput = screen.getByLabelText('Channel Name');
        await userEvent.type(nameInput, 'Test Channel');

        const adminCheckbox = screen.getByLabelText('user1');
        await userEvent.click(adminCheckbox);
        
        // Submit form
        const submitButton = screen.getByRole('button', { name: /Create Channel|Creating.../ });
        await userEvent.click(submitButton);
        
        // Error should be displayed
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('closes dialog on cancel', async () => {
        render(<ChannelDialog />);
        
        // Open dialog
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        // Click cancel
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        await userEvent.click(cancelButton);
        
        // Dialog should be closed
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
    });

    it('renders all admin options', async () => {
        render(<ChannelDialog />);
        
        // Open dialog
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        mockUsers.forEach(user => {
            expect(screen.getByText(user.username)).toBeInTheDocument();
        });
    });

    it('handles form state changes correctly', async () => {
        render(<ChannelDialog />);
        
        // Open dialog
        const newChannelButton = screen.getByRole('button', { name: 'New Channel' });
        await userEvent.click(newChannelButton);
        
        // Test name input
        const nameInput = screen.getByTestId('channel-name');
        await userEvent.type(nameInput, 'Test Channel');
        expect(nameInput).toHaveValue('Test Channel');
        
        // Test privacy radio
        const publicRadio = screen.getByTestId('channel-privacy-public');
        await userEvent.click(publicRadio);
        expect(publicRadio).toBeChecked;
        
        // Test comments checkbox
        const commentsCheckbox = screen.getByTestId('channel-canAddComments');
        await userEvent.click(commentsCheckbox);
        expect(commentsCheckbox).toBeChecked;
    });
});
