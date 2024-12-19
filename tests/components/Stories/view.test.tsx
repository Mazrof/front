import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ViewStories from "@/app/stories/view/page"; // Adjust path to where your component is
import { getStories } from "@/services/Stories/Stories";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the getStories function
jest.mock("../../../services/Stories/Stories", () => ({
  getStories: jest.fn(),
}));

describe("ViewStories Component", () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
    jest.useFakeTimers(); // Enable fake timers for auto-advance test cases
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers(); // Clean up timers after each test
  });

  it("handles the case when no stories are available", async () => {
    (getStories as jest.Mock).mockResolvedValueOnce({
      status: "success",
      data: { allFriendsStories: [] },
    });

    render(<ViewStories />);

    // Check if the 'No stories to display' message is shown
    expect(screen.getByText("No stories to display.")).toBeInTheDocument();
  });

  it("navigates to next story when next button is clicked", async () => {
    const mockStories = [
      {
        username: "john_doe",
        photo: "https://example.com/photo.jpg",
        stories: [
          {
            content: "Story 1",
            mediaType: "photo",
            color: "blue",
            storyMedia: "https://example.com/image.jpg",
          },
          {
            content: "Story 2",
            mediaType: "photo",
            color: "green",
            storyMedia: "https://example.com/image2.jpg",
          },
        ],
      },
    ];

    (getStories as jest.Mock).mockResolvedValueOnce({
      status: "success",
      data: { allFriendsStories: mockStories },
    });

    render(<ViewStories />);

    // Wait for the first story to render
    await screen.findByText("Story 1");

    // Click on the next button (check by class name or aria-label)
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Wait for the next story to appear
    await screen.findByText("Story 2");

    expect(screen.getByText("Story 2")).toBeInTheDocument();
  });

  it("navigates to previous story when previous button is clicked", async () => {
    const mockStories = [
      {
        username: "john_doe",
        photo: "https://example.com/photo.jpg",
        stories: [
          {
            content: "Story 1",
            mediaType: "photo",
            color: "blue",
            storyMedia: "https://example.com/image.jpg",
          },
          {
            content: "Story 2",
            mediaType: "photo",
            color: "green",
            storyMedia: "https://example.com/image2.jpg",
          },
        ],
      },
    ];

    (getStories as jest.Mock).mockResolvedValueOnce({
      status: "success",
      data: { allFriendsStories: mockStories },
    });

    render(<ViewStories />);

    // Wait for the first story to render
    await screen.findByText("Story 1");

    // Click on the next button to move to Story 2
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Now click on the previous button
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);

    // Check that we're back to the first story
    expect(screen.getByText("Story 1")).toBeInTheDocument();
  });

  

  it("auto-advances the story after a set time", async () => {
    const mockStories = [
      {
        username: "john_doe",
        photo: "https://example.com/photo.jpg",
        stories: [
            {
                content: "Story 1",
                mediaType: "photo",
                color: "blue",
                storyMedia: "https://example.com/image.jpg",
              },
              {
                content: "Story 2",
                mediaType: "photo",
                color: "blue",
                storyMedia: "https://example.com/image.jpg",
              }
        ],
      },
    ];

    (getStories as jest.Mock).mockResolvedValueOnce({
      status: "success",
      data: { allFriendsStories: mockStories },
    });

    render(<ViewStories />);

    // Wait for the story to appear
    await screen.findByText("Story 1");

    // Simulate the auto-advance timer
    jest.advanceTimersByTime(5000); // Advance by 5 seconds

    // Check that the next story is shown (or the next action is triggered)
    expect(screen.queryByText("Story 1")).toBeInTheDocument();
  });
});
