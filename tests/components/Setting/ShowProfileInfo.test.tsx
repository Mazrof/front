import { screen, render } from "@testing-library/react";
import ShowProfileInfo from "@/components/Settings/ShowProfileInfo";
import Image from "next/image";
type AvatarProp = {
    prop: {
        url: string | undefined;
    };
};
const setSettingsMock = jest.fn();
jest.mock("../../../store/settings.ts", () => ({
    useSettings: () => setSettingsMock(),
}));
jest.mock("../../../components/Settings/Avatar.tsx", () => ({
    __esModule: true, // This line is necessary for default exports
    default: jest.fn(
        ({ prop }: AvatarProp) =>
            prop.url && (
                <Image
                    data-testid="mock-image"
                    src={prop.url || ""}
                    alt="mock-avatar"
                    width={200}
                    height={200}
                />
            )
    ),
}));

describe("ShowProfileInfo Component", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders the profile photo", () => {
        setSettingsMock.mockReturnValue({
            settings: {
                photo: "/images/Avatar-2.png", // or undefined
            },
        });

        render(<ShowProfileInfo />);
        expect(screen.getByTestId("mock-image")).toBeInTheDocument();
    });
    it("Not renders the profile photo", () => {
        setSettingsMock.mockReturnValue({
            settings: {
                photo: null, // or undefined
            },
        });

        render(<ShowProfileInfo />);
        // Use queryByTestId to check for the absence of the image element
        expect(screen.queryByTestId("mock-image")).not.toBeInTheDocument();
    });

    it("renders the screen Name when provided", () => {
        setSettingsMock.mockReturnValue({
            settings: {
                screenName: "Nesma",
            },
        });

        render(<ShowProfileInfo />);
        const profilePhoto = screen.getByText("Nesma");
        expect(profilePhoto).toBeInTheDocument();
    });
});
