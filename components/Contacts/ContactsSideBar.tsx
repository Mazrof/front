import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import { DarkMode, SetDarkMode, SetShowContacts, ShowContacts } from "@/types/SideBar";
type SideBarProp = {
    darkMode: DarkMode;
    setDarkMode: SetDarkMode;
    showContacts: ShowContacts;
    setShowContacts: SetShowContacts;
};
export default function ContactsSideBar(sideBarProp:SideBarProp) {
    return (
        <div className="relative min-h-screen  group max-w-full overflow-y-hidden bg-white py-2 pl-2 transition-all duration-500 dark:bg-black md:block min-w-2/7 w-3/12">
            <ContactsSearchBar {...sideBarProp} />
            <ContactsList />
        </div>
    );
}
