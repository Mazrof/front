"use client";
import { useSettings, useSettingsPageType, useWhoCanAttributes } from "@/store/settings";
import Nav from "./Nav";
import { Ban } from "lucide-react";
import { handleOnClick } from "@/utils/settings";
import { PrivacyOptionsEnum, PrivacyTitleEnum } from "@/types/settings";
function PrivacySecurity() {
    const { settingPageName, setPageName } = useSettingsPageType();
    const { setWhoCanAttributes } = useWhoCanAttributes();
    const { settings } = useSettings();
    const isShowPrivacySettings = settingPageName === "Privacy Settings";
    function handleWhoCan(
        event: React.MouseEvent<HTMLButtonElement>,
        message: PrivacyTitleEnum,
        updatedValueType: string,
        value: PrivacyOptionsEnum
    ) {
        event.preventDefault();
        setWhoCanAttributes({ title: message, privacyName: updatedValueType, value });
        setPageName("Privacy");
    }

    return (
        settings && (
            <div className={` ${!isShowPrivacySettings && "hidden"} settings-layout px-5`}>
                <Nav />
                <div className="w-full border-b-2 border-gray-600 pb-7">
                    <button
                        className="flex gap-6"
                        onClick={(event) => handleOnClick(event, "Block", setPageName)}
                    >
                        <Ban className="settings-icons" />
                        Blocked Users
                    </button>
                </div>
                <div className="flex w-full flex-col  gap-6">
                    <h2 className="text-violet-500">Privacy</h2>
                    <button
                        className="settings-who-can"
                        onClick={(event) =>
                            handleWhoCan(
                                event,
                                "Stories",
                                "storyVisibility",
                                settings.storyVisibility
                            )
                        }
                    >
                        <h2>Who can see my story?</h2>
                        <h3>{settings?.storyVisibility}</h3>
                    </button>

                    <button
                        className="settings-who-can"
                        onClick={(event) =>
                            handleWhoCan(
                                event,
                                "Profile Photo",
                                "profilePicVisibility",
                                settings.profilePicVisibility
                            )
                        }
                    >
                        <h2>Who can see my profile photo?</h2>
                        <h3>{settings?.profilePicVisibility}</h3>
                    </button>
                    <button
                        className="settings-who-can"
                        onClick={(event) =>
                            handleWhoCan(
                                event,
                                "Last Seen",
                                "lastSeenVisibility",
                                settings.lastSeenVisibility
                            )
                        }
                    >
                        <h2>Who can see my Last seen time?</h2>
                        <h3>{settings?.lastSeenVisibility}</h3>
                    </button>
                    <button
                        className="settings-who-can"
                        onClick={(event) =>
                            handleWhoCan(
                                event,
                                "Read Receipts",
                                "readReceiptsEnabled",
                                settings.readReceiptsEnabled
                            )
                        }
                    >
                        <h2>Who can see read receipts ?</h2>
                        <h3>{settings?.readReceiptsEnabled}</h3>
                    </button>
                </div>
            </div>
        )
    );
}
export default PrivacySecurity;
