import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import CreateStoryWithText from "@/app/stories/create/write/page";
import { sendStory } from "@/services/Stories/Stories";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the sendStory function
jest.mock("../../../services/Stories/Stories", () => ({
  sendStory: jest.fn(),
}));

describe("CreateStoryWithText Component", () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  it("changes the text in the textarea when user types", () => {
    render(<CreateStoryWithText />);
    
    const textArea = screen.getByPlaceholderText("Write your story here...");
    fireEvent.change(textArea, { target: { value: "Hello World" } });

    expect(textArea).toHaveValue("Hello World");
  });

  it("submits the form successfully", async () => {
    (sendStory as jest.Mock).mockResolvedValueOnce({});
    
    render(<CreateStoryWithText />);
    
    const textArea = screen.getByPlaceholderText("Write your story here...");
    fireEvent.change(textArea, { target: { value: "This is a story" } });

    const submitButton = screen.getByText("Submit Story");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sendStory).toHaveBeenCalledWith(expect.objectContaining({
        content: "This is a story",
        mediaType: "photo",
        color: "blue",
        storyMedia: undefined,
      }));
    });

    expect(routerPushMock).toHaveBeenCalledWith("/stories");
  });
});
