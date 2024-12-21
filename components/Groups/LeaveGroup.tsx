import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { useState } from "react";
import { deleteMember } from "@/services/Group";
import { failResponse, genericResponse } from "@/types/api";
import { useSelectedChatRoom, useWhoAmI } from "@/store/user";

type LeaveGroupProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function LeaveGroup({ groupId, isOpen, onClose }: LeaveGroupProps) {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setChatRoom } = useSelectedChatRoom();
    const me = useWhoAmI();
    const handleLeave = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response: genericResponse<object> = await deleteMember(
                groupId,
                Number(me.user?.user.id)
            );
            if (response?.status === "fail") {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            } else {
                onClose();
                setChatRoom(null);
            }
        } catch (err) {
            setError(`An unexpected error occurred: ${err}. Please try again later.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800">
                    Leave Group
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="leave-group-description">
                <DialogHeader>
                    <DialogTitle>Leave Group</DialogTitle>
                    <p id="leave-group-description" className="text-sm text-gray-500">
                        Are you sure you want to leave this Group?
                    </p>
                </DialogHeader>

                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" className="mr-2">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleLeave}
                        disabled={isSubmitting}
                        className="w-full bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800"
                    >
                        {isSubmitting ? "Leaving..." : "Leave"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
