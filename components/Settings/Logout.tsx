"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { logout } from "@/services/User";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/User";
export function Logout() {
    const router = useRouter();
    async function onLogout() {
        await logout();
        router.push("/login");
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">
                        <MoreVertical className="h-6 w-6 text-gray-500" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <button className="w-20" type="button" onClick={onLogout}>
                        Logout
                    </button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
