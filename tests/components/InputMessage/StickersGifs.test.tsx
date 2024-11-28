import { screen, render } from "@testing-library/react";
import StickersGifs from "@/components/Chats/InputMessage/StickersGifs";
import { StickerGif } from "@/types/inputMessage";
const mockStickers: StickerGif[] = [
    {
        url: "https://i.pinimg.com/474x/c1/00/81/c10081631f89e8b1ab4888230bfd45b2.jpg",
        id: 1,
    },
];
const mockGifs: StickerGif[] = [
    {
        url: "https://i.pinimg.com/originals/3b/dc/77/3bdc775d77bfdd22e9624555333f6141.gif",
        id: 1,
    },
];
const setStickersGifsMock = jest.fn();
jest.mock("../../../store/inputMessage.ts", () => ({
    useStickersGifs: () => setStickersGifsMock(),
}));
describe("Stickers Gifs", () => {
    setStickersGifsMock.mockReturnValue({
        stickers: mockStickers,
        gifs: mockGifs,
    });
    describe("Render", () => {
        it("sholud Render stickers if option is Stickers", () => {
            render(<StickersGifs option="Stickers" />);
            const stickers = screen.getByTestId("Stickers");
            expect(stickers).toBeInTheDocument();
        });
        it("sholud Render sticker image if option is Stickers", () => {
            render(<StickersGifs option="Stickers" />);
            const stickerImage = screen.getByTestId(`Stickers${mockStickers[0].id}`);
            expect(stickerImage).toBeInTheDocument();
        });
        it("sholud not render  gifs if option is Stickers", () => {
            render(<StickersGifs option="Stickers" />);
            const gifs = screen.queryByTestId("Gifs");
            expect(gifs).not.toBeInTheDocument();
        });
        it("sholud Render gifs if option is Gifs", () => {
            render(<StickersGifs option="Gifs" />);
            const gifs = screen.getByTestId("Gifs");
            expect(gifs).toBeInTheDocument();
        });
        it("sholud Render gifs image if option is Gifs", () => {
            render(<StickersGifs option="Gifs" />);
            const gifsImage = screen.getByTestId(`Gifs${mockGifs[0].id}`);
            expect(gifsImage).toBeInTheDocument();
        });
        it("sholud not render  stickers if option is Gifs", () => {
            render(<StickersGifs option="Gifs" />);
            const stickers = screen.queryByTestId("Stickers");
            expect(stickers).not.toBeInTheDocument();
        });
        it("should not render Stickers and Gifs if option is Emoji", () => {
            render(<StickersGifs option="Emoji" />);
            const stickers = screen.queryByTestId("Stickers");
            const gifs = screen.queryByTestId("Gifs");
            expect(stickers).not.toBeInTheDocument();
            expect(gifs).not.toBeInTheDocument();
        });
    });
});
