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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
const forwardSchema = z.object({
    recipients: z
        .array(z.string())
        .refine((recipients) => recipients.length > 0, "Please select at least one recipient."),
});
function ForwardMessage() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { users, isLoading } = useUsers();
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(forwardSchema),
        defaultValues: {
            recipients: [],
        },
    });

    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message: message,
        });
    };

    const onSubmit = async (data: z.infer<typeof forwardSchema>) => {
        try {
            console.log("Forwarding message to:", data.recipients);
            reset();
            setIsOpen(false);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorRoot("Failed to forward the message. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    Forward
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Forward Message
                    </h2>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="max-h-[200px] space-y-2 overflow-y-auto">
                        <Label className="text-gray-700 dark:text-gray-300">
                            Select Recipients
                        </Label>
                        {isLoading ? (
                            <p>Loading users...</p>
                        ) : (
                            <div className="space-y-2">
                                {users.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            {...register("recipients")}
                                            value={user.id?.toString()}
                                            id={`recipient-${user.id}`}
                                            className="text-blue-500 dark:text-blue-400"
                                            data-test="recipient-select"
                                        />
                                        <Label
                                            htmlFor={`recipient-${user.id}`}
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            {user.username}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.recipients && (
                            <p className="text-sm text-red-500" data-test="recipients-error">
                                {errors.recipients.message}
                            </p>
                        )}
                    </div>

                    {errors.root && (
                        <div className="mx-auto mt-4 text-sm text-red-700" data-testid="root-error">
                            {errors.root.message}
                        </div>
                    )}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="mr-2"
                                data-test="forward-cancelButton"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                            data-test="forward-submitButton"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Forwarding...
                                </>
                            ) : (
                                "Forward"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ForwardMessage;
