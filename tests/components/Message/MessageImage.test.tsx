/* eslint-disable @typescript-eslint/no-require-imports */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MessageImage } from "@/components/Chats/Message/MessageImage";

jest.mock("../../../provider/MessageProvider", () => ({
    useMessageContext: jest.fn(() => ({
        imageUrl: ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.jpg", "/image5.jpg"],
    })),
}));

describe("MessageImage Component", () => {
    let useMessageContextMock: jest.SpyInstance;

    beforeEach(() => {
        useMessageContextMock = jest.spyOn(
            require("../../../provider/MessageProvider"),
            "useMessageContext"
        );
        useMessageContextMock.mockReturnValue({
            imageUrl: ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.jpg", "/image5.jpg"],
        });
    });

    afterEach(() => {
        useMessageContextMock.mockRestore();
    });
    test("renders image thumbnails and overlays", () => {
        render(<MessageImage />);

        expect(screen.getByAltText("photo 0")).toBeInTheDocument();
        expect(screen.getByAltText("photo 3")).toBeInTheDocument();

        const overlay = screen.getByText("+1");
        expect(overlay).toBeInTheDocument();
    });

    test("opens and closes dialog with selected image", async () => {
        render(<MessageImage />);

        const imageThumbnail = screen.getByAltText("photo 0");
        fireEvent.click(imageThumbnail);

        expect(screen.getByAltText("Preview Image 1")).toBeInTheDocument();

        const closeButton = screen.getByRole("button", { name: /close/i });
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByAltText("Preview Image 1")).not.toBeInTheDocument();
        });
    });

    test("navigates through images using Previous and Next buttons", () => {
        render(<MessageImage />);

        fireEvent.click(screen.getByAltText("photo 0"));

        const prevButton = screen.getByRole("button", { name: "Previous Image" });
        const nextButton = screen.getByRole("button", { name: "Next Image" });

        expect(prevButton).toBeDisabled();

        fireEvent.click(nextButton);
        expect(screen.getByAltText("Preview Image 2")).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByAltText("Preview Image 3")).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByAltText("Preview Image 4")).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByAltText("Preview Image 5")).toBeInTheDocument();

        expect(nextButton).toBeDisabled();

        fireEvent.click(prevButton);
        expect(screen.getByAltText("Preview Image 4")).toBeInTheDocument();
    });

    test("handles fewer than 4 images correctly", () => {
        const useMessageContextMock = jest.spyOn(
            require("../../../provider/MessageProvider"),
            "useMessageContext"
        );
        useMessageContextMock.mockReturnValue({
            imageUrl: ["/image1.jpg", "/image2.jpg"],
        });

        render(<MessageImage />);

        expect(screen.getByAltText("photo 0")).toBeInTheDocument();
        expect(screen.getByAltText("photo 1")).toBeInTheDocument();

        const overlay = screen.queryByText("+1");
        expect(overlay).not.toBeInTheDocument();

        useMessageContextMock.mockRestore();
    });

    test("does not allow navigation past the last image", async () => {
        render(<MessageImage />);

        fireEvent.click(screen.getByAltText("photo 0"));
        const nextButton = screen.getByRole("button", { name: "Next Image" });

        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);

        expect(nextButton).toBeDisabled();
    });

    test("Previous button is disabled on the first image", async () => {
        render(<MessageImage />);

        fireEvent.click(screen.getByAltText("photo 0"));
        const prevButton = screen.getByRole("button", { name: "Previous Image" });

        expect(prevButton).toBeDisabled();
    });
});
