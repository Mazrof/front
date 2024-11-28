import { useState } from "react";
import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import { Contact, DarkMode, SetDarkMode, SetShowGlobalSearch, ShowGlobalSearch } from "@/types/SideBar";
type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showGlobalSearch: ShowGlobalSearch;
    setShowGlobalSearch: SetShowGlobalSearch;
};
export default function GlobalSearchSideBar(sideBarProp:SideBarProp) {
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
   
    function handleSearchResults(contacts: Contact[]) {
        setFilteredContacts(contacts); // Update the filtered contacts list
    }
    return (
        <div className="relative min-h-screen  group max-w-full overflow-y-hidden bg-white py-2 pl-2 transition-all duration-500 dark:bg-black md:block min-w-2/7 w-3/12">
            <ContactsSearchBar {...sideBarProp} onSearch={handleSearchResults} />
            <ContactsList contacts={filteredContacts} />
        </div>
    );
}
