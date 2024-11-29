import { render, screen } from '@testing-library/react';
import Avatar from '@/components/SideBar/Avatar'; // Adjust the path based on your file structure
import { genAvatar } from '@/utils/genAvatar';

// Mock the genAvatar function
jest.mock('../../../utils/genAvatar');

describe('Avatar component', () => {
  it('should render an avatar with the correct letter', () => {
    // Set up the mock function to return a specific letter
    (genAvatar as jest.Mock).mockReturnValue('A');

    // Render the Avatar component
    render(<Avatar name="Alice" />);

    // Check if the avatar letter 'A' is rendered
    const avatarLetter = screen.getByText('A');
    expect(avatarLetter).toBeInTheDocument();
  });

  it('should render nothing if genAvatar returns null', () => {
    // Set up the mock function to return null
    (genAvatar as jest.Mock).mockReturnValue(null);

    // Render the Avatar component
    render(<Avatar name="123" />); // Test with a non-letter name

    // Check if the avatar is not rendered at all
    const avatarContainer = screen.queryByRole('img'); // Assuming the avatar has a role of img or you can adjust to the container element's role
    expect(avatarContainer).not.toBeInTheDocument();
  });
});
