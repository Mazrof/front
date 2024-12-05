"use client";
import DisplayInfo from "./DisplayInfo";
import { useSettings } from "@/store/settings";
import { AtSign, Info, Mail, Phone } from "lucide-react";
function DisplayInfoList() {
    const { settings } = useSettings();

    return (
        <div className="flex flex-col gap-4 pb-3">
            <DisplayInfo
                prop={{
                    infoType: "email",
                    infoContent: settings?.email,
                    icon: <Mail className="settings-icons" />,
                    dataTest: "settings-email",
                }}
            />

            <DisplayInfo
                prop={{
                    infoType: "phone",
                    infoContent: settings?.phone,
                    icon: <Phone className="settings-icons" />,
                    dataTest: "settings-phone",
                }}
            />

            <DisplayInfo
                prop={{
                    infoType: "UserName",
                    infoContent: settings?.username,
                    icon: <AtSign className="settings-icons" />,
                    dataTest: "settings-username",
                }}
            />

            <DisplayInfo
                prop={{
                    infoType: "bio",
                    infoContent: settings?.bio,
                    icon: <Info className="settings-icons" />,
                    dataTest: "settings-bio",
                }}
            />
        </div>
    );
}

export default DisplayInfoList;
