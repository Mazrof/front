import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { failResponse, genericResponse } from "@/types/api";
import { useUsers } from "@/hooks/useUsers";
import { createGroup } from "@/services/Group";
const groupSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Group name must be at least 3 characters" })
        .max(50, { message: "Group name cannot exceed 50 characters" }),
    privacy: z.boolean(),
    canAddComments: z.boolean(),
    groupSize: z
        .number()
        .min(3, { message: "Group size must be at least 3 members" })
        .max(500000, { message: "Group size cannot exceed 500000 members" }),
    admins: z.array(z.string()), // New admins field
});

function GroupDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { users, isLoading } = useUsers();

    const {
        control,
        register,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            name: "",
            privacy: false,
            canAddComments: true,
            groupSize: 100,
            admins: [],
        },
    });

    const setRootError = (message: string) => {
        setError("root", {
            type: "manual",
            message,
        });
    };

    const onSubmit = async (data: z.infer<typeof groupSchema>) => {
        const response: genericResponse<object> = await createGroup(data);

        if (response.status === "success") {
            reset();
            setIsOpen(false);
        } else {
            const failApiResponse = response as failResponse;
            setRootError(failApiResponse.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    New Group
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create a New Group
                    </h2>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Group Name</Label>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Enter group name"
                            data-test="group-name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500" data-test="group-name-error">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Group Privacy</Label>
                        <Controller
                            control={control}
                            name="privacy"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    value={field.value.toString()}
                                    className="flex space-x-4"
                                >
                                    <div>
                                        <RadioGroupItem
                                            value="false"
                                            id="public"
                                            data-test="group-privacy-public"
                                        />
                                        <Label htmlFor="public">Public</Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value="true"
                                            id="private"
                                            data-test="group-privacy-private"
                                        />
                                        <Label htmlFor="private">Private</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            {...register("canAddComments")}
                            id="canAddComments"
                            data-test="group-canAddComments"
                        />
                        <Label htmlFor="canAddComments">Allow Comments</Label>
                    </div>

                    <div className="max-h-[200px] space-y-2 overflow-y-auto">
                        <Label>Select Admins</Label>
                        {isLoading ? (
                            <p>Loading users...</p>
                        ) : (
                            users.map((user) => (
                                <div key={user.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        {...register("admins")}
                                        value={user.id?.toString()}
                                        id={`admin-${user.id}`}
                                        data-test="group-selectAdmins"
                                    />
                                    <Label htmlFor={`admin-${user.id}`}>{user.username}</Label>
                                </div>
                            ))
                        )}
                    </div>

                    {errors.root && (
                        <div className="text-sm text-red-700">{errors.root.message}</div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" data-test="group-cancelButton">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            data-test="group-createButton"
                        >
                            {isSubmitting ? "Creating..." : "Create Group"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default GroupDialog;
