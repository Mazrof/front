import { screen, render } from "@testing-library/react";
import DisplayInfoList from "@/components/Settings/DisplayInfoList";
const setSettingsMock = jest.fn();
jest.mock("../../../store/settings.ts", () => ({
    useSettings: () => setSettingsMock(),
}));
describe(" Display Info List", () => {
    setSettingsMock.mockReturnValue({
        settings: {
            email: "nesma2172003@gmail.com",
            phone: "+201067193062",
            username: "nesmaosama",
           bio:"student at cairo university"
       }
    });
    describe("Render", () => {
        it(`should show email `, () => {
            render(<DisplayInfoList/>);
            const email = screen.getByText("nesma2172003@gmail.com");
            expect(email).toBeInTheDocument();
        });
        it(`should show  as a phone `, () => {
            render(<DisplayInfoList />);
            const userName = screen.getByText("+201067193062");
            expect(userName).toBeInTheDocument();
        });
        it(`should show bio `, () => {
            render(<DisplayInfoList/>);
            const userNameBio = screen.getByText("student at cairo university");
            expect(userNameBio).toBeInTheDocument();
        });
        it(`should show username `, () => {
            render(<DisplayInfoList/>);
            const userNameBio = screen.getByText("nesmaosama");
            expect(userNameBio).toBeInTheDocument();
        });
    });
});
