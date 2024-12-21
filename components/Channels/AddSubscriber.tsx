import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { addMembersToChannel } from "@/services/Channel";
import { User } from "@/types/user";
import { failResponse } from "@/types/api";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
const memberSchema = z.object({
    selectedmember: z
        .object({
            userId: z.number(),
            role: z.string().default("member"),
            hasDownloadPermissions: z.boolean().default(false),
        })
        .refine((val) => val !== undefined, { message: "Please select a member." }), // Fix the typo in the error message too
});

type memberFormInputs = z.infer<typeof memberSchema>;
type AddSubscriberProps = {
    channelId: number;
    isOpen: boolean;
    onClose: () => void;
};
export default function AddSubscriber({ channelId, isOpen, onClose }: AddSubscriberProps) {
    const { users, isLoading, error } = useUsers();
    const [globalError, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<memberFormInputs>({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            selectedmember: {
                userId: 0, // Provide a valid number default
                role: "member",
                hasDownloadPermissions: false,
            },
        },
    });

    const selectedmember = watch("selectedmember");

    const onSubmit: SubmitHandler<memberFormInputs> = async (data) => {
        try {
            const response = await addMembersToChannel(
                {
                    userId: data.selectedmember.userId,
                    hasDownloadPermissions: data.selectedmember.hasDownloadPermissions,
                },
                channelId
            );
            if (response.status === "success") {
                reset();
                onClose();
            } else {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            }
        } catch (err) {
            console.error("Failed to add member:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add new member
                    </h2>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        {isLoading ? (
                            <p className="text-gray-500">Loading members...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">
                                    Select a user to make them member:
                                </p>
                                <div className="space-y-2">
                                    {users?.map((member: User) => (
                                        <div key={member.id} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`member-${member.id}`}
                                                checked={
                                                    selectedmember?.userId === Number(member.id)
                                                }
                                                onChange={() =>
                                                    setValue("selectedmember", {
                                                        userId: Number(member.id),
                                                        role: "member",
                                                        hasDownloadPermissions: false,
                                                    })
                                                }
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`member-${member.id}`}
                                                className="text-gray-800 dark:text-gray-200"
                                            >
                                                {member.username}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.selectedmember && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.selectedmember.message}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                    {globalError && <p className="text-sm text-red-500">{globalError}</p>}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="mr-2">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isLoading}
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
