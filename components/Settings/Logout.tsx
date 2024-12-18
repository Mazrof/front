"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/User";
import { useState } from "react";
import { useSettingsPageType } from "@/store/settings";
import { toast } from "@/hooks/use-toast";
export function Logout() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setPageName } = useSettingsPageType();
    const router = useRouter();
    async function onLogout() {
        setIsLoading(true);
        await logout();
        toast({
            title: `You Logged out Successfully`,
            description: "You'll be redirected to Login Page soon",
            duration: 1500,
        });
        setTimeout(() => {
            setPageName(null);
            router.push("/login");
        }, 1050);
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
                    <button className="w-20" type="button" onClick={onLogout} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Logout"}
                    </button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
