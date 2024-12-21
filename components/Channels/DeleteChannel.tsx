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
import { deleteChannel } from "@/services/Channel";
import { failResponse, genericResponse } from "@/types/api";
import { useSelectedChatRoom } from "@/store/user";

type DeleteChannelProps = {
    channelId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function DeleteChannel({ channelId, isOpen, onClose }: DeleteChannelProps) {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setChatRoom } = useSelectedChatRoom();
    const handleDelete = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response: genericResponse<object> = await deleteChannel(channelId);
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
                <Button className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800">
                    Delete Channel
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="delete-channel-description">
                <DialogHeader>
                    <DialogTitle>Delete Channel</DialogTitle>
                    <p id="delete-channel-description" className="text-sm text-gray-500">
                        Are you sure you want to delete this channel? This action is irreversible.
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
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="w-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                    >
                        {isSubmitting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
