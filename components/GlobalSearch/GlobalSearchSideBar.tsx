import {
    Contact,
    DarkMode,
    SetDarkMode,
    SetShowGlobalSearch,
    ShowGlobalSearch,
} from "@/types/SideBar";
import { useState } from "react";
import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";

type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showGlobalSearch: ShowGlobalSearch;
    setShowGlobalSearch: SetShowGlobalSearch;
};

export default function GlobalSearchSideBar(sideBarProp: SideBarProp) {
    const [groupedContacts, setGroupedContacts] = useState<{
        users: Contact[];
        groups: Contact[];
        channels: Contact[];
    }>({
        users: [],
        groups: [],
        channels: [],
    });

    function handleSearchResults(contacts: {
        users: Contact[];
        groups: Contact[];
        channels: Contact[];
    }) {
        setGroupedContacts(contacts); // Update the grouped contacts list
    }

    return (
        <div className="min-w-2/7 group relative min-h-screen w-3/12 max-w-full overflow-y-hidden bg-white py-2 pl-2 transition-all duration-500 dark:bg-black md:block">
            <ContactsSearchBar {...sideBarProp} onSearch={handleSearchResults} />
            <ContactsList
                groupedContacts={groupedContacts}
                setShowGlobalSearch={sideBarProp.setShowGlobalSearch}
                showGlobalSearch={sideBarProp.showGlobalSearch}
            />
        </div>
    );
}
