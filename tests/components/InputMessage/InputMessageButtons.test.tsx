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
        it("should render voiceIcon when there is no text ", () => {
            textMock.mockReturnValue({ textMessage: "" });
            recordingMock.mockReturnValue({ isRecording: false });
            render(<InputMessageButtons />);
            const voiceIcon = screen.getByTestId("voiceIcon");
            expect(voiceIcon).toBeInTheDocument();
        });
        it("should render sendMsIcon when there is a text ", () => {
            textMock.mockReturnValue({ textMessage: "message" });
            recordingMock.mockReturnValue({ isRecording: false });
            render(<InputMessageButtons />);
            const sendIcon = screen.getByTestId("sendMsIcon");
            expect(sendIcon).toBeInTheDocument();
        });
        it("should render sendVoiceIcon when is recording", () => {
            textMock.mockReturnValue({ textMessage: "" });
            recordingMock.mockReturnValue({ isRecording: true });
            render(<InputMessageButtons />);
            const sendVoiceIcon = screen.getByTestId("sendVoiceIcon");
            expect(sendVoiceIcon).toBeInTheDocument();
        });
        it("should render deleteIcon when when is recording", () => {
            textMock.mockReturnValue({ textMessage: "" });
            recordingMock.mockReturnValue({ isRecording: true });
            render(<InputMessageButtons />);
            const sendIcon = screen.getByTestId("sendVoiceIcon");
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
        it("should call setRecording with true when click on recording  button", async () => {
            const setRecordingMock = jest.fn();
            textMock.mockReturnValue({
                textMessage: "",
            });
            recordingMock.mockReturnValue({ isRecording: false, setIsRecording: setRecordingMock });
            render(<InputMessageButtons />);
            const voiceIcon = screen.getByTestId("voiceIcon");
            await userEvent.click(voiceIcon);
            await waitFor(() => {
                expect(setRecordingMock).toHaveBeenCalledWith(true);
            });
        });
        it("should call setRecording with true when click on send voice  button", async () => {
            const setRecordingMock = jest.fn();
            textMock.mockReturnValue({ textMessage: "" });
            recordingMock.mockReturnValue({ isRecording: true, setIsRecording: setRecordingMock });
            render(<InputMessageButtons />);
            const sendVoiceIcon = screen.getByTestId("sendVoiceIcon");
            await userEvent.click(sendVoiceIcon);
            await waitFor(() => {
                expect(setRecordingMock).toHaveBeenCalledWith(false);
            });
        });
        it("should call setRecording with true when click on delete voice  button", async () => {
            const setRecordingMock = jest.fn();
            textMock.mockReturnValue({ textMessage: "" });
            recordingMock.mockReturnValue({ isRecording: true, setIsRecording: setRecordingMock });
            render(<InputMessageButtons />);
            const deleteIcon = screen.getByTestId("deleteIcon");
            await userEvent.click(deleteIcon);
            await waitFor(() => {
                expect(setRecordingMock).toHaveBeenCalledWith(false);
            });
        });
    });
});
