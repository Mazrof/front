import { render, screen, fireEvent } from "@testing-library/react";
import SettingsOptions from "@/components/Settings/SettingsOptions";
import { useSettingsPageType } from "@/store/settings";
import * as settingsUtils from "@/utils/settings"; 
jest.mock("../../../store/settings", () => ({
    useSettingsPageType: jest.fn(),
}));


jest.mock("../../../utils/settings", () => ({
    handleOnClick: jest.fn(),
}));

describe("SettingsOptions", () => {
    const mockSetPageName = jest.fn();

    beforeEach(() => {
       
        (useSettingsPageType as unknown as jest.Mock).mockReturnValue({
            setPageName: mockSetPageName,
        });

       
        jest.clearAllMocks();
    });

    it("renders all buttons with correct icons and text", () => {
        render(<SettingsOptions />);

        expect(screen.getByText(/Data and Storage/i)).toBeInTheDocument();
        expect(screen.getByText(/Privacy and Security/i)).toBeInTheDocument();
        expect(screen.getByText(/Devices/i)).toBeInTheDocument();


    });

    it("calls handleOnClick with correct arguments when Data and Storage button is clicked", () => {
        render(<SettingsOptions />);

        const button = screen.getByText(/Data and Storage/i);
        fireEvent.click(button);

        expect(settingsUtils.handleOnClick).toHaveBeenCalledWith(expect.any(Object), "Storage", mockSetPageName);
    });

    it("calls handleOnClick with correct arguments when Privacy Settings button is clicked", () => {
        render(<SettingsOptions />);

        const button = screen.getByText(/Privacy and Security/i);
        fireEvent.click(button);

        expect(settingsUtils.handleOnClick).toHaveBeenCalledWith(expect.any(Object), "Privacy Settings", mockSetPageName);
    });

    it("calls handleOnClick with correct arguments when Devices button is clicked", () => {
        render(<SettingsOptions />);

        const button = screen.getByText(/Devices/i);
        fireEvent.click(button);

        expect(settingsUtils.handleOnClick).toHaveBeenCalledWith(expect.any(Object), "Devices", mockSetPageName);
    });
});
