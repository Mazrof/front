import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { deleteGroup } from "@/services/Group";
import { failResponse, genericResponse } from "@/types/api";

type DeleteGroupProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function DeleteGroupDialog({ groupId, isOpen, onClose }: DeleteGroupProps) {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response: genericResponse<object> = await deleteGroup(groupId);
            if (response.status === "success") {
                onClose();
            } else {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            }
        } catch (err) {
            setError(`An unexpected error occurred: ${err}. Please try again later.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Delete Group
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Are you sure you want to delete this group? This action is irreversible.
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
                        className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                    >
                        {isSubmitting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
