import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Copy } from "lucide-react";

type InviteLinkDialogProps = {
    inviteLink: string;
    isOpen: boolean;
    onClose: () => void;
};

export default function InviteLinkDialog({ inviteLink, isOpen, onClose }: InviteLinkDialogProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Show Invite Link
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite Link</DialogTitle>
                    <DialogDescription>
                        Share this link to invite others to join the channel
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="break-words rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                        {inviteLink}
                    </p>

                    <Button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        <Copy size={18} />
                        {isCopied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
