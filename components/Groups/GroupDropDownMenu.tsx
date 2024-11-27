import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";

export default function GroupDropDownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ThreeDotsIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Add Admins</DropdownMenuItem>
                <DropdownMenuItem>Add Subscriber</DropdownMenuItem>
                <DropdownMenuItem>Set Group Privacy</DropdownMenuItem>
                <DropdownMenuItem>Invite Link</DropdownMenuItem>
                <DropdownMenuItem>Forward Message</DropdownMenuItem>
                <DropdownMenuItem>Set Ability to Post and Edit and delete</DropdownMenuItem>
                <DropdownMenuItem>
                    Set Who can Download Video and Audio (Admins/everyone/NoOne)
                </DropdownMenuItem>
                <DropdownMenuItem>Mute For (How much Time)</DropdownMenuItem>
                <DropdownMenuItem>Send Announcement</DropdownMenuItem>
                <DropdownMenuItem>List of Group Members</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
