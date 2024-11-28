import { screen, render } from "@testing-library/react";
import Emoji from "@/components/Chats/InputMessage/Emoji";
// Mock @emoji-mart/react with default export
jest.mock("@emoji-mart/react", () => ({
    __esModule: true, 
    default: () => <div data-testid="mock-picker" >Mock Emoji Picker</div>
}));

describe("Emoji", () => {

    describe("Render", () => {
        it("should render picker when option is Emoji", () => {
            render(<Emoji option="Emoji" />);
            const picker = screen.getByTestId("mock-picker");
            expect(picker).toBeInTheDocument();
        });
        it("should not render picker when option is not Emoji", () => {
            render(<Emoji option="Stickers" />);
            expect(screen.queryByTestId("mock-picker")).not.toBeInTheDocument();
        });

    });
});

