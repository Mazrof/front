import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDotsIcon } from "@/utils/icons";
export default function PersonalDropDownMenu() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ThreeDotsIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-black dark:text-white">
                    <DropdownMenuItem>Block</DropdownMenuItem>
                    <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                    <DropdownMenuItem>Forward Message</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
