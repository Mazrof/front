import { useChannelMembers } from "@/hooks/useChannelMembers";
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
import { deleteMember } from "@/services/Channel";
import { ChannelMember } from "@/types/user";
import { useState } from "react";

const memberSchema = z.object({
    userId: z.number().min(1, "Please select a member to delete."),
});

type MemberFormInputs = z.infer<typeof memberSchema>;

type DeleteMemberProps = {
    channelId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function DeleteMember({ channelId, isOpen, onClose }: DeleteMemberProps) {
    const { members, loading, error } = useChannelMembers(channelId);
    const [globalError, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
        setValue,
        watch,
    } = useForm<MemberFormInputs>({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            userId: 0,
        },
    });

    const selectedUserId = watch("userId");

    const onSubmit: SubmitHandler<MemberFormInputs> = async ({ userId }) => {
        try {
            const response = await deleteMember(channelId, userId);
            if (response.status === "success") {
                reset();
                onClose();
            } else {
                setError("Failed to delete member. Please try again.");
            }
        } catch (err) {
            console.error("Failed to delete member:", err);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Delete Member
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
                                    Select a user to delete:
                                </p>
                                <div className="space-y-2">
                                    {members?.map((member: ChannelMember) => (
                                        <div key={member.userId} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={`member-${member.userId}`}
                                                checked={selectedUserId === member.userId}
                                                onChange={() => setValue("userId", member.userId)}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={`member-${member.userId}`}
                                                className="text-gray-800 dark:text-gray-200"
                                            >
                                                {member.users.username}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    {errors.userId && (
                        <p className="text-sm text-red-500">{errors.userId.message}</p>
                    )}
                    {globalError && <p className="text-sm text-red-500">{globalError}</p>}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="mr-2">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
