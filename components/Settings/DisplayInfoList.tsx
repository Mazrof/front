"use client";
import DisplayInfo from "./DisplayInfo";
import { useSettings } from "@/store/settings";
import { AtSign, Info, Mail, Phone } from "lucide-react";
function DisplayInfoList() {
    const { settings } = useSettings();

    return (
        <div className="flex flex-col gap-4  pb-3">
            <div className="flex flex-col items-start justify-center">
                <DisplayInfo
                    prop={{ infoType: "email", infoContent: settings?.email, icon: <Mail className="settings-icons" /> }}
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <DisplayInfo
                    prop={{
                        infoType: "phone",
                        infoContent: settings?.phoneNumber,
                        icon: <Phone className="settings-icons" />,
                    }}
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <DisplayInfo
                    prop={{
                        infoType: "UserName",
                        infoContent: settings?.username,
                        icon: <AtSign className="settings-icons" />,
                    }}
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <DisplayInfo
                    prop={{
                        infoType: "bio",
                        infoContent: settings?.bio,
                        icon: <Info className="settings-icons" />,
                    }}
                />
            </div>
        </div>
    );
}

export default DisplayInfoList;
