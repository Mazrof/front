import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MessageVideo } from "@/components/Chats/Message/MessageVideo";

// Mock ReactPlayer to avoid dynamic import issues
// eslint-disable-next-line react/display-name
jest.mock("react-player", () => (props: { url: string }) => (
    <div data-testid="mock-react-player">{`Playing ${props.url}`}</div>
));

// Mock useMessageContext to provide video URLs for testing
jest.mock("../../../provider/MessageProvider", () => ({
    useMessageContext: jest.fn(() => ({
        videoUrl: ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4"],
    })),
}));

describe("MessageVideo Component", () => {
    test("renders video thumbnails and overlays", () => {
        render(<MessageVideo />);

        // Check that the first four video thumbnails are displayed
        expect(screen.getByAltText("video 1")).toBeInTheDocument();
        expect(screen.getByAltText("video 4")).toBeInTheDocument();

        // Verify overlay shows correct count for additional videos beyond the first four
        const overlay = screen.getByText("+1");
        expect(overlay).toBeInTheDocument();
    });

    test("opens and closes dialog with selected video", async () => {
        render(<MessageVideo />);

        // Open dialog by clicking the first video thumbnail
        const videoThumbnail = screen.getByAltText("video 1");
        fireEvent.click(videoThumbnail);

        // Verify the dialog opened and the first video is playing
        expect(screen.getByTestId("mock-react-player")).toHaveTextContent("Playing video1.mp4");

        // Close the dialog
        const closeButton = screen.getByRole("button", { name: "Close" });
        fireEvent.click(closeButton);
        await waitFor(() => {
            expect(screen.queryByTestId("mock-react-player")).not.toBeInTheDocument();
        });
    });

    test("disables Previous button on the first video and Next button on the last video", () => {
        render(<MessageVideo />);

        // Open the dialog
        fireEvent.click(screen.getByAltText("video 1"));
        const prevButton = screen.getByRole("button", { name: "Previous Video" });
        const nextButton = screen.getByRole("button", { name: "Next Video" });

        // Previous button should be disabled on the first video
        expect(prevButton).toBeDisabled();

        // Navigate to the last video
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);

        // Next button should be disabled on the last video
        expect(nextButton).toBeDisabled();
    });
});
