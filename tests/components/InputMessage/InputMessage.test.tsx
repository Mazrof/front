import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputMessage from "@/components/Chats/InputMessage/InputMessage";
jest.mock("../../../components/Chats/InputMessage/EmojiStickersGif.tsx", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn(() => <div data-testid="mock-Emoji">EmojiStickers</div>),
}))
jest.mock("../../../components/Chats/InputMessage/InputMessageButtons.tsx", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn(() => <div data-testid="mock-buttons">InputMessageButtons</div>),
}))
jest.mock("../../../components/Chats/InputMessage/AttachFiles.tsx", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn(() => <div data-testid="mock-Files">Attach Files</div>),
}))
const setTextMessageMock = jest.fn();
jest.mock("../../../store/inputMessage.ts", () => ({
    useInputTextMessage: () => ({
        textMessage: "New Message",
        setTextMessage: setTextMessageMock,
    }),
}));
describe("Input Message", () => {
    describe("Render", () => {
        it("should render input message field", () => {
            render(<InputMessage placeHolder="Message" />)
            const inputField = screen.getByTestId("inputMessageField")
            expect(inputField).toBeInTheDocument()
        })
        it("should render emoji component", () => {
            render(<InputMessage placeHolder="Message" />)
            const emoji = screen.getByTestId("mock-Emoji")
            expect(emoji).toBeInTheDocument()

        })
        it("should render attach files component", () => {
            render(<InputMessage placeHolder="Message" />)
            const attachFiles = screen.getByTestId("mock-Files")
            expect(attachFiles).toBeInTheDocument()

        })
        it("should render input message buttons component", () => {
            render(<InputMessage placeHolder="Message" />)
            const messageButtons = screen.getByTestId("mock-buttons")
            expect(messageButtons).toBeInTheDocument()

        })

    })
    describe("Functionality", () => {
        it("should call the setTextMessage when change the input field", async () => {
            render(<InputMessage placeHolder="Message" />)
            const inputField = screen.getByTestId("inputMessageField")
            await userEvent.type(inputField, "New Message")
            await waitFor(() => {
                expect(setTextMessageMock).toHaveBeenCalled()
            })
        })
        it("should write the input inside the input field", async () => {
            render(<InputMessage placeHolder="Message" />)
            const inputField = screen.getByTestId("inputMessageField")
            await userEvent.type(inputField, "New Message")
            await waitFor(() => {
                expect(inputField).toHaveValue("New Message")
            })
        })
    })
})