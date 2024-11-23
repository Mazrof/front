"use client";
import React from "react";
import ShowProfileInfo from "./ShowProfileInfo";
import SettingsOptions from "./SettingsOptions";
import Nav from "./Nav";
import { useSettingsPageType } from "@/store/settings";
function PersonalSettings() {
    const { settingPageName } = useSettingsPageType();
    const isShowPersonal = settingPageName === "Personal Settings";
    return (
        <div className={` ${!isShowPersonal && "hidden"} settings-layout px-5 `}>
            <Nav>
                <Nav.SettingsButtons />
            </Nav>
            <ShowProfileInfo />
            <SettingsOptions />
        </div>
    );
}

export default PersonalSettings;
