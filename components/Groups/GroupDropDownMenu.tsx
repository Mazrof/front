import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
import { useState } from "react";
import GroupSettings from "./GroupSettings";
import GroupMembersList from "./GroupMembersList";
import MuteNotification from "./MuteNotification";
import { addMemberToGroup } from "@/services/Group";
import { failResponse } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import AddMember from "./AddMember";
import DeleteMember from "./DeleteMember";
import DeleteGroup from "./DeleteGroup";
import EditMember from "./EditMember";
import LeaveGroup from "./LeaveGroup";
import { useWhoAmI } from "@/store/user";
type groupDropMenuProps = {
    myRole: "none" | "admin" | "member";
    groupId: number;
    groupSize: number;
    privacy: boolean;
    name: string;
    imageURL: string;
};
export default function GroupDropDownMenu({
    name,
    imageURL,
    myRole,
    groupId,
    groupSize,
    privacy,
}: groupDropMenuProps) {
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);
    const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
    const [isDeleteMemberOpen, setIsDeleteMemberOpen] = useState(false);
    const [isLeaveGroupOpen, setIsLeaveGroupOpen] = useState(false);
    const [isMembersListOpen, setIsMembersListOpen] = useState(false);
    const [isMuteNotificationsOpen, setIsMuteNotificationsOpen] = useState(false);
    const { user } = useWhoAmI();
    const handleJoiningGroup = async () => {
        try {
            const body: {
                memberId: number;
                role: "admin" | "member";
                hasMessagePermissions: boolean;
                hasDownloadPermissions: boolean;
            } = {
                memberId: Number(user?.user.id),
                role: "member",
                hasMessagePermissions: false,
                hasDownloadPermissions: false,
            };
            const response = await addMemberToGroup(body, groupId);

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
                    {myRole === "none" && (
                        <DropdownMenuItem onClick={handleJoiningGroup}>Join Group</DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsAddMemberOpen(true)}>
                            Add Member
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsEditMemberOpen(true)}>
                            Edit Member
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsDeleteMemberOpen(true)}>
                            Delete Member
                        </DropdownMenuItem>
                    )}
                    {myRole !== "none" && (
                        <DropdownMenuItem onClick={() => setIsMembersListOpen(true)}>
                            List of Group Members
                        </DropdownMenuItem>
                    )}

                    {myRole !== "none" && (
                        <DropdownMenuItem onClick={() => setIsMuteNotificationsOpen(true)}>
                            Mute Notifications
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                            Settings
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && (
                        <DropdownMenuItem onClick={() => setIsDeleteGroupOpen(true)}>
                            Delete Group
                        </DropdownMenuItem>
                    )}
                    {myRole !== "none" && (
                        <DropdownMenuItem onClick={() => setIsLeaveGroupOpen(true)}>
                            Leave Group
                        </DropdownMenuItem>
                    )}
                    {myRole === "admin" && <DropdownMenuItem>Send Announcement</DropdownMenuItem>}
                    <DropdownMenuItem>Forward Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden">
                <AddMember
                    groupId={groupId}
                    isOpen={isAddMemberOpen}
                    onClose={() => setIsAddMemberOpen(false)}
                />
                <GroupSettings
                    name={name}
                    imageURL={imageURL}
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
                <DeleteMember
                    isOpen={isDeleteMemberOpen}
                    onClose={() => setIsDeleteMemberOpen(false)}
                    groupId={groupId}
                />
                <DeleteGroup
                    isOpen={isDeleteGroupOpen}
                    groupId={groupId}
                    onClose={() => setIsDeleteGroupOpen(false)}
                />
                <EditMember
                    groupId={groupId}
                    isOpen={isEditMemberOpen}
                    onClose={() => setIsEditMemberOpen(false)}
                />
                <LeaveGroup
                    groupId={groupId}
                    isOpen={isLeaveGroupOpen}
                    onClose={() => setIsLeaveGroupOpen(false)}
                />
            </div>
        </>
    );
}
