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
import { User } from "@/types/user";
import { failResponse } from "@/types/api";
import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { addMemberToGroup } from "@/services/Group";

const memberSchema = z.object({
    selectedUser: z
        .object({
            userId: z.number(),
            role: z.enum(["member", "admin"]).default("member"),
            hasMessagePermissions: z.boolean().default(false),
            hasDownloadPermissions: z.boolean().default(false),
        })
        .required("Please select a user and configure their permissions."),
});

type memberFormInputs = z.infer<typeof memberSchema>;

type AddMemberProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function AddMember({ groupId, isOpen, onClose }: AddMemberProps) {
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
            selectedUser: undefined,
        },
    });

    const selectedUser = watch("selectedUser");

    const onSubmit: SubmitHandler<memberFormInputs> = async (data) => {
        try {
            const response = await addMemberToGroup(
                {
                    memberId: data.selectedUser.userId,
                    role: data.selectedUser.role,
                    hasMessagePermissions: data.selectedUser.hasMessagePermissions,
                    hasDownloadPermissions: data.selectedUser.hasDownloadPermissions,
                },
                groupId
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
                            <p className="text-gray-500">Loading users...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">
                                    Select a user and configure their permissions:
                                </p>
                                <div className="space-y-2">
                                    {users?.map((user: User) => (
                                        <div key={user.id} className="space-y-1">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`user-${user.id}`}
                                                    checked={
                                                        selectedUser?.userId === Number(user.id)
                                                    }
                                                    onChange={() =>
                                                        setValue("selectedUser", {
                                                            userId: Number(user.id),
                                                            role: "member",
                                                            hasMessagePermissions: false,
                                                            hasDownloadPermissions: false,
                                                        })
                                                    }
                                                    className="mr-2"
                                                />
                                                <label
                                                    htmlFor={`user-${user.id}`}
                                                    className="text-gray-800 dark:text-gray-200"
                                                >
                                                    {user.username}
                                                </label>
                                            </div>
                                            {selectedUser?.userId === Number(user.id) && (
                                                <div className="ml-6 space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`message-permissions-${user.id}`}
                                                            checked={
                                                                selectedUser.hasMessagePermissions
                                                            }
                                                            onChange={(e) =>
                                                                setValue("selectedUser", {
                                                                    ...selectedUser,
                                                                    hasMessagePermissions:
                                                                        e.target.checked,
                                                                })
                                                            }
                                                            className="mr-2"
                                                        />
                                                        <label
                                                            htmlFor={`message-permissions-${user.id}`}
                                                            className="text-gray-800 dark:text-gray-200"
                                                        >
                                                            Message Permissions
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`download-permissions-${user.id}`}
                                                            checked={
                                                                selectedUser.hasDownloadPermissions
                                                            }
                                                            onChange={(e) =>
                                                                setValue("selectedUser", {
                                                                    ...selectedUser,
                                                                    hasDownloadPermissions:
                                                                        e.target.checked,
                                                                })
                                                            }
                                                            className="mr-2"
                                                        />
                                                        <label
                                                            htmlFor={`download-permissions-${user.id}`}
                                                            className="text-gray-800 dark:text-gray-200"
                                                        >
                                                            Download Permissions
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id={`role-member-${user.id}`}
                                                            name="role"
                                                            checked={selectedUser.role === "member"}
                                                            onChange={() =>
                                                                setValue("selectedUser", {
                                                                    ...selectedUser,
                                                                    role: "member",
                                                                })
                                                            }
                                                            className="mr-2"
                                                        />
                                                        <label
                                                            htmlFor={`role-member-${user.id}`}
                                                            className="text-gray-800 dark:text-gray-200"
                                                        >
                                                            Member
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id={`role-admin-${user.id}`}
                                                            name="role"
                                                            checked={selectedUser.role === "admin"}
                                                            onChange={() =>
                                                                setValue("selectedUser", {
                                                                    ...selectedUser,
                                                                    role: "admin",
                                                                })
                                                            }
                                                            className="mr-2"
                                                        />
                                                        <label
                                                            htmlFor={`role-admin-${user.id}`}
                                                            className="text-gray-800 dark:text-gray-200"
                                                        >
                                                            Admin
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.selectedUser && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.selectedUser.message}
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
