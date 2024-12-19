import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import MainPage from "@/app/stories/create/page";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("MainPage Component", () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  it("renders the page with title and buttons", () => {
    render(<MainPage />);

    // Check if the title is rendered
    expect(screen.getByText("Create a New Story")).toBeInTheDocument();

    // Check if the buttons are rendered with correct labels
    expect(screen.getByText("Take Photo")).toBeInTheDocument();
    expect(screen.getByText("Upload Media")).toBeInTheDocument();
  });

  it("navigates to the correct route when the 'Take Photo' button is clicked", () => {
    render(<MainPage />);

    // Find the "Take Photo" button and click it
    const takePhotoButton = screen.getByText("Take Photo");
    fireEvent.click(takePhotoButton);

    // Check if the router push function is called with the correct path
    expect(routerPushMock).toHaveBeenCalledWith("/stories/create/photo");
  });

  it("navigates to the correct route when the 'Upload Media' button is clicked", () => {
    render(<MainPage />);

    // Find the "Upload Media" button and click it
    const uploadMediaButton = screen.getByText("Upload Media");
    fireEvent.click(uploadMediaButton);

    // Check if the router push function is called with the correct path
    expect(routerPushMock).toHaveBeenCalledWith("/stories/create/write");
  });
});
