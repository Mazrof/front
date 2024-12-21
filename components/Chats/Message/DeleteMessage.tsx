import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function DeleteMessage() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            console.log("Message deleted successfully!");
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
            setIsOpen(false); // Close the dialog after operation completes
        } catch (error) {
            console.error("Failed to delete the message.",error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Delete Message
                    </DialogTitle>
                    <p className="text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete this message? This action cannot be undone.
                    </p>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="mr-2"
                            data-test="delete-cancelButton"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                        data-test="delete-confirmButton"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Sure"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteMessage;
