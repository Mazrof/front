import { useGroupMembers } from "@/hooks/useGroupMembers";
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
import { editMember } from "@/services/Group";
import { GroupMember } from "@/types/user";
import { failResponse } from "@/types/api";
import { useEffect, useState } from "react";

const memberSchema = z.object({
    userId: z.number(),
    role: z.enum(["admin", "member"]),
    hasDownloadPermissions: z.boolean(),
});

type MemberFormInputs = z.infer<typeof memberSchema>;

type EditMemberProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function EditMember({ groupId, isOpen, onClose }: EditMemberProps) {
    const { members, loading, error } = useGroupMembers(groupId);
    const [globalError, setError] = useState<string | null>(null);

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<MemberFormInputs>({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            userId: 0,
            role: "member",
            hasDownloadPermissions: false,
        },
    });

    const selectedUserId = watch("userId");

    useEffect(() => {
        const selectedMember = members?.find((m) => m.userId === selectedUserId);
        if (selectedMember) {
            setValue("role", selectedMember.role);
            setValue("hasDownloadPermissions", selectedMember.hasDownloadPermissions);
        }
    }, [selectedUserId, members, setValue]);

    const onSubmit: SubmitHandler<MemberFormInputs> = async ({
        role,
        hasDownloadPermissions,
        userId,
    }) => {
        try {
            const response = await editMember({ role, hasDownloadPermissions }, groupId, userId);
            if (response.status === "success") {
                reset();
                onClose();
            } else {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            }
        } catch (err) {
            console.error("Failed to update member:", err);
            setError("An unexpected error occurred.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit Member
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
                                    Select a user:
                                </p>
                                <div className="space-y-2">
                                    {members?.map((member: GroupMember) => (
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
                    {selectedUserId > 0 && (
                        <>
                            <div>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">Role:</p>
                                <div className="space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            value="admin"
                                            checked={watch("role") === "admin"}
                                            onChange={() => setValue("role", "admin")}
                                        />
                                        Admin
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="member"
                                            checked={watch("role") === "member"}
                                            onChange={() => setValue("role", "member")}
                                        />
                                        Member
                                    </label>
                                </div>
                            </div>
                            <div>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">
                                    Can Download:
                                </p>
                                <div className="space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            value="true"
                                            checked={watch("hasDownloadPermissions") === true}
                                            onChange={() =>
                                                setValue("hasDownloadPermissions", true)
                                            }
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="false"
                                            checked={watch("hasDownloadPermissions") === false}
                                            onChange={() =>
                                                setValue("hasDownloadPermissions", false)
                                            }
                                        />
                                        No
                                    </label>
                                </div>
                            </div>
                        </>
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
                            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
