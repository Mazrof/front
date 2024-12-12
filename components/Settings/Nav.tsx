"use client";
import { LeftArrowIcon } from "@/utils/icons";
import { useSettingsPageType } from "@/store/settings";
import { Logout } from "./Logout";
import { Pencil } from "lucide-react";
type NavProps = {
    children?: React.ReactNode;
};
function Nav({ children }: NavProps) {
    const { setPageName, settingPageName } = useSettingsPageType();
    function handleArrowClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (settingPageName === "Personal Settings") setPageName(null);
        else if (settingPageName === "Privacy" || settingPageName === "Block")
            setPageName("Privacy Settings");
        else setPageName("Personal Settings");
    }
    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex w-1/2 items-center justify-between text-lg">
                <button
                    onClick={(event) => handleArrowClick(event)}
                    data-test="settings-leftArrowReturnButton"
                >
                    <LeftArrowIcon />
                </button>
                <h2>{settingPageName}</h2>
            </div>
            {children}
        </div>
    );
}
const NavSettingsButtons = () => {
    const { setPageName } = useSettingsPageType();

    return (
        <div className="flex w-1/4 items-center justify-between">
            <button
                onClick={() => setPageName("Profile Update")}
                data-test="settings-profileUpdate"
            >
                <Pencil className="settings-icons" />
            </button>
            <Logout />
        </div>
    );
};
Nav.SettingsButtons = NavSettingsButtons;
export default Nav;
