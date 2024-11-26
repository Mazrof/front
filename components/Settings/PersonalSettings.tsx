"use client";
import React, { useEffect } from "react";
import ShowProfileInfo from "./ShowProfileInfo";
import SettingsOptions from "./SettingsOptions";
import Nav from "./Nav";
import { useSettingsPageType } from "@/store/settings";
import { useSelectedChatId } from "@/store/user";
function PersonalSettings() {
    const { settingPageName } = useSettingsPageType();
    const { id, setChatId } = useSelectedChatId();
    const isShowPersonal = settingPageName === "Personal Settings";
    useEffect(() => {
        if (isShowPersonal && id) setChatId(null);
    }, [isShowPersonal]);
    return (
        <div className={` ${!isShowPersonal && "hidden"} settings-layout px-5`}>
            <Nav>
                <Nav.SettingsButtons />
            </Nav>
            <ShowProfileInfo />
            <SettingsOptions />
        </div>
    );
}

export default PersonalSettings;
