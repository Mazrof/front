export type PrivacyOptionsEnum= "everyone" | "contacts" | "nobody"
export type SettingsObject = {
    id?:string,
    photo: string;
    screenName: string;
    username: string;
    bio: string;
    phone: string;
    email: string;
    profilePicVisibility: PrivacyOptionsEnum;
    storyVisibility: PrivacyOptionsEnum;
    lastSeenVisibility: PrivacyOptionsEnum;
    readReceiptsEnabled: PrivacyOptionsEnum;
    autoDownloadSizeLimit: number;
    maxLimitFileSize: number;
    privateKey: string|null;
    publicKey: string;
    IsEmailVerified?: boolean;
    IsPhoneVerified?: boolean;
    password?: string;
    passwordChangedAt?: Date | null;
    status?: boolean;
    lastSeen?: null|Date;
    activeNow?: boolean;
    providerType?: null;
    providerId?: null;
};
export type SettingResponse = {
    user:SettingsObject
}
export type UpdatedSettingResponse = {
    updatedUser: SettingsObject;
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
export type PrivacyTitleEnum = "Last Seen" | "Profile Photo" | "Stories" | "Read Receipts"
export type WhoCanAttributeObject = {
    privacyName: string;
    title: PrivacyTitleEnum;
    value: PrivacyOptionsEnum;
};
export type WhoCanAttributes = {
    attribute: WhoCanAttributeObject;
    setWhoCanAttributes: (newValues: WhoCanAttributeObject) => void;
};
