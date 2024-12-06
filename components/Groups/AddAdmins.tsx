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
import { addAdminsToGroup } from "@/services/Group";
import { GroupMember } from "@/types/user";
import { Checkbox } from "../ui/checkbox";

const adminSchema = z.object({
    selectedAdmins: z
        .array(
            z.object({
                userId: z.number(),
                role: z.string().default("admin"),
                hasDownloadPermissions: z.boolean().default(false),
            })
        )
        .min(1, "Please select at least one admin."),
});

type AdminFormInputs = z.infer<typeof adminSchema>;

type AddAdminsProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};

export default function AddAdmins({ groupId, isOpen, onClose }: AddAdminsProps) {
    const { members, loading, error } = useGroupMembers(groupId);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        getValues,
    } = useForm<AdminFormInputs>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            selectedAdmins: [],
        },
    });
    const toggleAdmin = (userId: number) => {
        const selected = getValues("selectedAdmins");
        const index = selected.findIndex((admin) => admin.userId === userId);
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push({
                userId,
                role: "admin",
                hasDownloadPermissions: true,
            });
        }
        setValue("selectedAdmins", selected, { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
        try {
            const formattedAdmins = data.selectedAdmins.map((admin) => ({
                userId: admin.userId,
                role: "admin",
                hasDownloadPermissions: admin.hasDownloadPermissions,
            }));

            const response = await addAdminsToGroup({ admins: formattedAdmins }, groupId);
            console.log("Add Admins Response:", response);

            reset(); // Clear form
            onClose(); // Close dialog
        } catch (err) {
            console.error("Failed to add admins:", err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add new Admins
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
                                    Select users to make them admins:
                                </p>
                                <div className="space-y-2">
                                    {members?.map((member: GroupMember) => (
                                        <div key={member.userId} className="flex items-center">
                                            <Checkbox
                                                id={`member-${member.userId}`}
                                                checked={getValues("selectedAdmins").some(
                                                    (selected) => selected.userId === member.userId
                                                )}
                                                onCheckedChange={() => toggleAdmin(member.userId)}
                                                {...register("selectedAdmins")}
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
                                {errors.selectedAdmins && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.selectedAdmins.message}
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
                            disabled={isSubmitting || loading}
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
