import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useMessageContext } from "@/provider/MessageProvider/MessageProvider";
import { MessageImage } from "./MessageImage";

const editSchema = z.object({
    messageText: z
        .string()
        .refine((messageText) => messageText.length > 0, "Message can't be Empty"),
});

function EditMessage() {
    const { text } = useMessageContext();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(editSchema),
        defaultValues: {
            messageText: text as string,
        },
    });

    const onSubmit = async (data: z.infer<typeof editSchema>) => {
        try {
            console.log("Edited message text:", data.messageText);
            reset();
            setIsOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Failed to edit the message.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    Edit Message
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit Message
                    </h2>
                </DialogHeader>
                <>
                    <MessageImage />
                </>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="messageText" className="text-gray-700 dark:text-gray-300">
                            Message Text
                        </Label>
                        <Input
                            id="messageText"
                            {...register("messageText")}
                            placeholder="Enter new message text"
                            className="text-gray-900 dark:text-white"
                            data-test="edit-message-input"
                        />
                        {errors.messageText && (
                            <p className="text-sm text-red-500" data-test="edit-message-error">
                                {errors.messageText.message}
                            </p>
                        )}
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-2"
                                data-test="edit-cancelButton"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                            data-test="edit-submitButton"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Editing...
                                </>
                            ) : (
                                "Edit"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditMessage;
