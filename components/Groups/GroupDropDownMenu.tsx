import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
import { useState } from "react";
import AddAdmins from "./AddAdmins";
import GroupSettings from "./GroupSettings";
import GroupMembersList from "./GroupMembersList";
import MuteNotification from "./MuteNotification";
import { addMembersToGroup } from "@/services/Group";
import { failResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import { MemberRole } from "@/types/user";
type groupDropMenuProps = {
    groupId: number;
    groupSize: number;
    privacy: boolean;
};
export default function GroupDropDownMenu({ groupId, groupSize, privacy }: groupDropMenuProps) {
    const [isAddAdminsOpen, setIsAddAdminsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMembersListOpen, setIsMembersListOpen] = useState(false);
    const [isMuteNotificationsOpen, setIsMuteNotificationsOpen] = useState(false);

    const handleJoiningGroup = async () => {
        try {
            const body: MemberRole = { role: "member" };
            const response = await addMembersToGroup(body, groupId);

            if (response.status === "fail") {
                const failApiResponse = response as failResponse;
                toast({
                    title: "Error Joining Group",
                    description: failApiResponse.message || "Something went wrong.",
                    duration: 5000,
                });
            } else {
                toast({
                    title: "Joined Successfully",
                    description: "You have successfully joined the group.",
                    duration: 5000,
                });
            }
        } catch (error) {
            toast({
                title: "Unexpected Error",
                description: `An unexpected error ${error} occurred. Please try again.`,
                duration: 5000,
            });
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ThreeDotsIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-black dark:text-white">
                    <DropdownMenuItem onClick={() => setIsAddAdminsOpen(true)}>
                        Add Admins
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleJoiningGroup}>Join Group</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsMembersListOpen(true)}>
                        List of Group Members
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setIsMuteNotificationsOpen(true)}>
                        Mute Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>Send Announcement</DropdownMenuItem>
                    <DropdownMenuItem>Forward Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden">
                <AddAdmins
                    groupId={groupId}
                    isOpen={isAddAdminsOpen}
                    onClose={() => setIsAddAdminsOpen(false)}
                />
                <GroupSettings
                    groupId={groupId}
                    isOpen={isSettingsOpen}
                    groupSize={groupSize}
                    privacy={privacy}
                    onClose={() => setIsSettingsOpen(false)}
                />
                <GroupMembersList
                    groupId={groupId}
                    isOpen={isMembersListOpen}
                    onClose={() => setIsMembersListOpen(false)}
                />
                <MuteNotification
                    groupId={groupId}
                    isOpen={isMuteNotificationsOpen}
                    onClose={() => setIsMuteNotificationsOpen(false)}
                />
            </div>
        </>
    );
}
