import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Info, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function DetailsInfo() {
    const textRef = useRef<HTMLParagraphElement>(null);
    const { toast } = useToast();

    const handleCopy = async () => {
        if (textRef.current) {
            try {
                const textToCopy = textRef.current.textContent || "";
                await navigator.clipboard.writeText(textToCopy);
                toast({
                    title: "Link Copied!",
                    description: "The link has been successfully copied to your clipboard.",
                    variant: "default",
                });
            } catch (error) {
                toast({
                    title: "Copy Failed",
                    description: "Unable to copy the link to your clipboard.",
                    variant: "destructive",
                });
                console.error("Failed to copy text:", error);
            }
        }
    };

    return (
        <div className="w-full max-w-sm">
            <Button variant="ghost" className="m-0 flex h-auto w-full py-8">
                <span className="block p-3">
                    <Info size={24} />
                </span>
                <div className="flex flex-1 flex-col items-start justify-start pl-5">
                    <p className="text-wrap text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti cum
                        voluptate, sit, perspiciatis quae, doloribus labore ea sequi alias
                        repudiandae nostrum fugit sed magnam est officiis. Officiis quos officia
                        sed?
                    </p>
                    <h4 className="text-md font-light">info</h4>
                </div>
            </Button>
            <Button variant="ghost" className="m-0 flex w-full py-8" onClick={handleCopy}>
                <span className="block p-3">
                    <Link size={24} />
                </span>
                <div className="flex flex-1 flex-col items-start justify-start pl-5">
                    <p ref={textRef} className="text-lg">
                        https://www.google.com
                    </p>
                    <h4 className="text-md font-light">Link</h4>
                </div>
            </Button>
            <Button
                variant="ghost"
                className="m-0 flex w-full py-8"
                onClick={() => {
                    // here comes an api call for Mute Notification
                }}
            >
                <span className="block p-3">
                    <Bell size={24} />
                </span>
                <div className="flex flex-1 items-start justify-between px-5">
                    <p className="text-lg">Notification</p>
                    <Switch className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-violet-600" />
                </div>
            </Button>
        </div>
    );
}
