import { render, screen, fireEvent } from "@testing-library/react";
import { Message } from "@/components/Chats/Message/Message";
import { MessageImage } from "@/components/Chats/Message/MessageImage";
import { MessageVideo } from "@/components/Chats/Message/MessageVideo";
import { MessageText } from "@/components/Chats/Message/MessageText";
import { MessageCreatedAt } from "@/components/Chats/Message/MessageCreatedAt";
import { MessageContext } from "@/provider/MessageProvider";
import "@testing-library/jest-dom";
import React from "react";

// Mock message data
const mockMessage = {
    text: "Hello, world!",
    createdAt: new Date().toISOString(),
    imageUrl: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    videoUrl: ["https://example.com/video1.mp4"],
};

const renderWithProvider = (ui: React.ReactElement, value = mockMessage) => {
    return render(<MessageContext.Provider value={value}>{ui}</MessageContext.Provider>);
};

describe("Message Component Tests", () => {
    test("renders Message component with children", () => {
        renderWithProvider(
            <Message message={mockMessage}>
                <span>Child content</span>
            </Message>
        );
        expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    test("displays message creation time correctly in MessageCreatedAt", () => {
        renderWithProvider(<MessageCreatedAt />);
        const timeElement = screen.getByText(/\d{1,2}:\d{2} (AM|PM)/);
        expect(timeElement).toBeInTheDocument();
    });

    test("renders text from message in MessageText", () => {
        renderWithProvider(<MessageText />);
        expect(screen.getByText(mockMessage.text)).toBeInTheDocument();
    });

    test("displays images and opens dialog when an image is clicked in MessageImage", () => {
        renderWithProvider(<MessageImage />);

        const images = screen.getAllByRole("img");
        expect(images.length).toBe(2);
        fireEvent.click(images[0]);
        expect(screen.getByRole("dialog")).toBeVisible();
    });

    test("displays videos and opens dialog when a video is clicked in MessageVideo", () => {
        renderWithProvider(<MessageVideo />);

        const videoThumbnail = screen.getByAltText("video 1");
        expect(videoThumbnail).toBeInTheDocument();
        fireEvent.click(videoThumbnail);
        expect(screen.getByRole("dialog")).toBeVisible();
    });

    test("navigates to previous and next images in MessageImage dialog", () => {
        renderWithProvider(<MessageImage />);

        const images = screen.getAllByRole("img");
        fireEvent.click(images[0]);

        const nextButton = screen.getByRole("button", { name: "Next Image" });
        fireEvent.click(nextButton);
        expect(screen.getByAltText("Preview Image 2")).toBeInTheDocument();

        const prevButton = screen.getByRole("button", { name: "Previous Image" });
        fireEvent.click(prevButton);
        expect(screen.getByAltText("Preview Image 1")).toBeInTheDocument();
    });
});
