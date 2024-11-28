import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Member, useChannelMembers } from "@/hooks/useChannelMembers";
import { AddMembersToChannel } from "@/services/Channel";

// Zod schema for form validation
const SubscriberSchema = z.object({
    selectedSubscribers: z
        .array(
            z.object({
                userId: z.number(),
                role: z.string().default("subscriber"),
                hasDownloadPermissions: z.boolean().default(false),
            })
        )
        .min(1, "Please select at least one subscriber."),
});

type SubscriberFormInputs = z.infer<typeof SubscriberSchema>;

type AddSubscribersProps = {
    channelId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function AddSubscribers({ channelId, isOpen, onClose }: AddSubscribersProps) {
    const { members, loading, error } = useChannelMembers(channelId);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SubscriberFormInputs>({
        resolver: zodResolver(SubscriberSchema),
        defaultValues: {
            selectedSubscribers: [],
        },
    });

    const onSubmit: SubmitHandler<SubscriberFormInputs> = async (data) => {
        try {
            const formattedSubscribers = data.selectedSubscribers.map((subscriber) => ({
                userId: subscriber.userId,
                role: "member",
                hasDownloadPermissions: subscriber.hasDownloadPermissions,
            }));

            const response = await AddMembersToChannel(
                { subscribers: formattedSubscribers },
                channelId
            );
            console.log("Add Subscribers Response:", response);

            reset(); // Clear form
            onClose(); // Close dialog
        } catch (err) {
            console.error("Failed to add subscribers:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    Add Subscribers
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add new Subscribers
                    </h2>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        {loading ? (
                            <p className="text-gray-500">Loading members...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">
                                    Select users to make them subscribers:
                                </p>
                                <Controller
                                    name="selectedSubscribers"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            {members.map((member: Member) => (
                                                <div key={member.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`subscriber-${member.id}`}
                                                        value={member.id}
                                                        checked={field.value.some(
                                                            (selected) =>
                                                                selected.userId === member.id
                                                        )}
                                                        onChange={(e) => {
                                                            const selected = [...field.value];
                                                            if (e.target.checked) {
                                                                selected.push({
                                                                    userId: member.id,
                                                                    role: "subscriber",
                                                                    hasDownloadPermissions: false,
                                                                });
                                                            } else {
                                                                const index = selected.findIndex(
                                                                    (item) =>
                                                                        item.userId === member.id
                                                                );
                                                                if (index > -1) {
                                                                    selected.splice(index, 1);
                                                                }
                                                            }
                                                            field.onChange(selected);
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    <label
                                                        htmlFor={`subscriber-${member.id}`}
                                                        className="text-gray-800 dark:text-gray-200"
                                                    >
                                                        {member.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                                {errors.selectedSubscribers && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.selectedSubscribers.message}
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="mr-2">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
