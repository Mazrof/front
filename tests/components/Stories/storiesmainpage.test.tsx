import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';  // Mock Next.js Router
import StoriesMainPage from '@/app/stories/page';

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('StoriesMainPage', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    // Set up the mock function for useRouter
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('renders the page with buttons', () => {
    render(<StoriesMainPage />);

    // Check that the "Create a New Story" button is rendered
    expect(screen.getByText(/Create a New Story/i)).toBeInTheDocument();

    // Check that the "View Existing Stories" button is rendered
    expect(screen.getByText(/View Existing Stories/i)).toBeInTheDocument();

    // Check that the "Go Back" button is rendered
    expect(screen.getByText(/Go Back/i)).toBeInTheDocument();
  });

  it('navigates to the create story page when "Create a New Story" button is clicked', () => {
    render(<StoriesMainPage />);

    // Simulate a click on the "Create a New Story" button
    fireEvent.click(screen.getByText(/Create a New Story/i));

    // Assert that the router push function is called with the correct URL
    expect(pushMock).toHaveBeenCalledWith('/stories/create');
  });

  it('navigates to the view stories page when "View Existing Stories" button is clicked', () => {
    render(<StoriesMainPage />);

    // Simulate a click on the "View Existing Stories" button
    fireEvent.click(screen.getByText(/View Existing Stories/i));

    // Assert that the router push function is called with the correct URL
    expect(pushMock).toHaveBeenCalledWith('/stories/view');
  });

  it('navigates to the home page when "Go Back" button is clicked', () => {
    render(<StoriesMainPage />);

    // Simulate a click on the "Go Back" button
    fireEvent.click(screen.getByText(/Go Back/i));

    // Assert that the router push function is called with the correct URL
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
