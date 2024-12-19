import { DarkMode, SetDarkMode, SetShowGlobalSearch, ShowGlobalSearch } from "@/types/SideBar";
import { useState } from "react";
import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import { SecondUser } from "@/types/user";
import { GroupData } from "@/types/group";
import { ChannelData } from "@/types/channel";

type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showGlobalSearch: ShowGlobalSearch;
    setShowGlobalSearch: SetShowGlobalSearch;
};

export default function GlobalSearchSideBar(sideBarProp: SideBarProp) {
    const [groupedContacts, setGroupedContacts] = useState<{
        users: SecondUser[];
        groups: GroupData[];
        channels: ChannelData[];
    }>({
        users: [],
        groups: [],
        channels: [],
    });

    function handleSearchResults(contacts: {
        users: SecondUser[];
        groups: GroupData[];
        channels: ChannelData[];
    }) {
        setGroupedContacts(contacts); // Update the grouped contacts list
    }

    return (
        <div className="min-w-2/7 group relative min-h-screen w-3/12 max-w-full overflow-y-hidden bg-white py-2 pl-2 dark:bg-black md:block">
            <ContactsSearchBar {...sideBarProp} onSearch={handleSearchResults} />
            <ContactsList
                groupedContacts={groupedContacts}
                setShowGlobalSearch={sideBarProp.setShowGlobalSearch}
                showGlobalSearch={sideBarProp.showGlobalSearch}
            />
        </div>
    );
}
