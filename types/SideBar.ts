import { Dispatch, SetStateAction } from "react";

export type ShowContacts = boolean;

export type SetShowContacts = Dispatch<SetStateAction<ShowContacts>>;

export type DarkMode = boolean;
export type SetDarkMode = Dispatch<SetStateAction<DarkMode>>;
