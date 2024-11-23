export type PrivacyOptionsEnum= "everyone" | "contacts" | "nobody"
export type SettingsObject = {
    picture: string;
    screenName: string;
    username: string;
    bio: string;
    phoneNumber: string;
    email: string;
    profilePicturePrivacy: PrivacyOptionsEnum;
    groupChatPrivacy: PrivacyOptionsEnum;
    storiesPrivacy: PrivacyOptionsEnum;
    lastSeenPrivacy: PrivacyOptionsEnum;
    readReceiptsEnabled: boolean;
    autoDownloadSizeLimit: number;
    privateKey: string;
    publicKey: string;
};
export type UserSettings = {
    settings: null | SettingsObject;
    setSettings: (newSettings: SettingsObject) => void;
};
export type  PageNameEnum = 
    | "Personal Settings"
    | "Block"
    | "Profile Update"
    | "Devices"
    | "Privacy Settings"
    | "Privacy"
    | "Storage"
    | null;

export type SettingsPageName = {
    settingPageName: PageNameEnum;
    setPageName: (pageName: PageNameEnum) => void;
};

