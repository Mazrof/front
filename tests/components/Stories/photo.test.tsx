/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateStoryWithPhoto from "@/app/stories/create/photo/page";
import { useRouter } from "next/navigation";

// Mocking Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking sendStory API
jest.mock("../../../services/Stories/Stories", () => ({
  sendStory: jest.fn(),
}));

import { sendStory } from "@/services/Stories/Stories";

describe("CreateStoryWithPhoto", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    Object.defineProperty(global.navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: jest.fn(),
      },
    });

    jest.clearAllMocks();
  });

  test("renders the initial UI with Open Camera button", () => {
    render(<CreateStoryWithPhoto />);

    expect(screen.getByRole("button", { name: /open camera/i })).toBeInTheDocument();
    expect(screen.getByText(/create your story with a photo/i)).toBeInTheDocument();
  });

  test("opens the camera when Open Camera button is clicked", async () => {
    const mockStream = {};
    jest.spyOn(navigator.mediaDevices, "getUserMedia").mockResolvedValue(mockStream as MediaStream);

    render(<CreateStoryWithPhoto />);

    const openCameraButton = screen.getByRole("button", { name: /open camera/i });
    fireEvent.click(openCameraButton);

    // Wait for video element to appear
    await waitFor(() => {
        expect(screen.getByLabelText("Camera Preview")).toBeInTheDocument();
    });
  });
//   test("captures a photo when Capture Photo button is clicked", async () => {
//     // Mock the stream object with getTracks method
//     const mockStream = {
//       getTracks: jest.fn().mockReturnValue([{ stop: jest.fn() }]),
//     };
  
//     jest.spyOn(navigator.mediaDevices, "getUserMedia").mockResolvedValue(mockStream as MediaStream);
  
//     render(<CreateStoryWithPhoto />);
  
//     const openCameraButton = screen.getByRole("button", { name: /open camera/i });
//     fireEvent.click(openCameraButton);
  
//     // Wait for video element to appear
//     await waitFor(() => {
//       expect(screen.getByLabelText("Camera Preview")).toBeInTheDocument();
//     });
  
//     // Mock canvas creation and behavior
//     const mockCanvas = { getContext: jest.fn() };
//     const mockContext = {
//       drawImage: jest.fn(),
//       toDataURL: jest.fn().mockReturnValue("mockPhotoDataURL"),
//     };
    
//     // Only mock createElement for canvas
//     const originalCreateElement = document.createElement;
//     jest.spyOn(document, "createElement").mockImplementation((tagName) => {
//       if (tagName === "canvas") {
//         mockCanvas.getContext.mockReturnValue(mockContext as unknown as CanvasRenderingContext2D);
//         return mockCanvas;
//       }
//       return originalCreateElement(tagName); // Calls the real createElement for other tags
//     });
  
//     const captureButton = screen.getByRole("button", { name: /capture photo/i });
//     fireEvent.click(captureButton);
  
//     // Verify photo is displayed
//     await waitFor(() => {
//       expect(screen.getByAltText("Captured Story")).toBeInTheDocument();
//     });
//   });
  
});
