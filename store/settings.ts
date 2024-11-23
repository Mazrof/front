import { UserSettings, SettingsPageName, PageNameEnum } from "@/types/settings";
import { create } from "zustand";

const useSettings = create<UserSettings>((set) => ({
    settings: null,
    setSettings: (newSettings) => set({ settings: newSettings }),
}));
const useSettingsPageType = create<SettingsPageName>((set) => ({
    settingPageName: "Personal Settings",
    setPageName: (newName: PageNameEnum) => set({ settingPageName: newName }),
}));
export { useSettings, useSettingsPageType };