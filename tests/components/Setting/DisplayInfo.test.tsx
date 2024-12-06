import { screen, render } from "@testing-library/react";
import DisplayInfo from "@/components/Settings/DisplayInfo";
import { AtSign } from "lucide-react";
const prop = {
    infoType: "UserName",
    infoContent: "nesmaosama",
    icon: <AtSign className="settings-icons" />,
};
describe(" Display Info", () => {
    describe("Render", () => {
        it(`should show ${prop.infoType} `, () => {
            render(<DisplayInfo prop={prop} />);
            const userName = screen.getByText(prop.infoContent);
            expect(userName).toBeInTheDocument();
        });
        it(`should show ${prop.infoType} as a field name `, () => {
            render(<DisplayInfo prop={prop} />);
            const userNameField = screen.getByText(prop.infoType);
            expect(userNameField).toBeInTheDocument();
        });
        it(`should show  ${prop.infoType} icon `, () => {
            render(<DisplayInfo prop={prop} />);
            const userNameIcon = screen.getByTestId("icon");
            expect(userNameIcon).toBeInTheDocument();
        });
    });
});
