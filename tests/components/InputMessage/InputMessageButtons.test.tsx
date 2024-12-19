import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputMessageButtons from "@/components/Chats/InputMessage/InputMessageButtons";
const textMock = jest.fn();
const recordingMock = jest.fn();
jest.mock("../../../store/inputMessage.ts", () => ({
    useInputTextMessage: () => textMock(),
    useIsRecording: () => recordingMock(),
}));
describe("Input Message Buttons", () => {
    beforeEach(() => {
        textMock.mockReset();
        recordingMock.mockReset();
    });
    describe("Render", () => {
        it("should render sendMsIcon when there is a text ", () => {
            textMock.mockReturnValue({ textMessage: "message" });
            recordingMock.mockReturnValue({ isRecording: false });
            render(<InputMessageButtons />);
            const sendIcon = screen.getByTestId("sendMsIcon");
            expect(sendIcon).toBeInTheDocument();
        });
      
    });
    describe("Functionality", () => {
        it("should call setText when click on send message button", async () => {
            const setTextMessageMock = jest.fn();
            textMock.mockReturnValue({
                textMessage: "message",
                setTextMessage: setTextMessageMock,
            });
            recordingMock.mockReturnValue({ isRecording: false });
            render(<InputMessageButtons />);
            const sendIcon = screen.getByTestId("sendMsIcon");
            await userEvent.click(sendIcon);
            await waitFor(() => {
                expect(setTextMessageMock).toHaveBeenCalledWith("");
            });
        });
       
    });
});
