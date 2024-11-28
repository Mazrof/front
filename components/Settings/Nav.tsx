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
        else setPageName("Personal Settings");
    }
    return (
        <div className="flex items-center justify-between w-full ">
            <div className="flex items-center justify-between w-1/2 text-lg">
                <button onClick={(event) => handleArrowClick(event)}>
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
        <div className="flex items-center justify-between  w-1/4">
            <button onClick={() => setPageName("Profile Update")}>
                <Pencil className="settings-icons" />
            </button>
            <Logout />
        </div>
    );
};
Nav.SettingsButtons = NavSettingsButtons;
export default Nav;
