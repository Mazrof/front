"use client";
import React, { useEffect } from "react";
import ShowProfileInfo from "./ShowProfileInfo";
import SettingsOptions from "./SettingsOptions";
import Nav from "./Nav";
import { useSettingsPageType } from "@/store/settings";
import { useSelectedChatRoom } from "@/store/user";
function PersonalSettings() {
    const { settingPageName } = useSettingsPageType();
    const { selectedChatRoom, setChatRoom } = useSelectedChatRoom();
    const isShowPersonal = settingPageName === "Personal Settings";
    useEffect(() => {
        if (isShowPersonal && selectedChatRoom) setChatRoom(null);
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
