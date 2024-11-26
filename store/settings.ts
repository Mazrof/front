import {
    UserSettings,
    SettingsPageName,
    PageNameEnum,
    WhoCanAttributes,
} from "@/types/settings";
import { create } from "zustand";

const useSettings = create<UserSettings>((set) => ({
    settings: null,
    setSettings: (newSettings) => set({ settings: newSettings }),
}));
const useSettingsPageType = create<SettingsPageName>((set) => ({
    settingPageName: null,
    setPageName: (newName: PageNameEnum) => set({ settingPageName: newName }),
}));
const useWhoCanAttributes = create<WhoCanAttributes>((set) => ({
    attribute: {title:"Profile Photo",privacyName:"phot",value:"everyone"},
    setWhoCanAttributes: (newValues) => {
        set({ attribute: newValues });
    },
}));
export { useSettings, useSettingsPageType, useWhoCanAttributes };
