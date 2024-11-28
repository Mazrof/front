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
import { Loader2 } from "lucide-react";
import { createGroup } from "@/services/Group";
import { failResponse, genericResponse } from "@/types/api";

// Zod Schema for form validation
const groupSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Group name must be at least 3 characters" })
        .max(50, { message: "Group name cannot exceed 50 characters" }),
    privacy: z.boolean(),
    groupSize: z
        .number()
        .min(10, { message: "Group size must be at least 10 members" })
        .max(1024, { message: "Group size cannot exceed 1024 members" }),
});

function GroupDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            privacy: false, // Default: public group
            groupSize: 100, // Default: 100 members
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
            reset(); // Clear form on success
            setIsOpen(false); // Close dialog
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
                    {/* Group Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                            Group Name
                        </Label>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Enter group name"
                            className="w-full border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Group Privacy Selection */}
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Group Privacy</Label>
                        <Controller
                            control={control}
                            name="privacy"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    value={field.value.toString()}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="false"
                                            id="public"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="public"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Public
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="true"
                                            id="private"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="private"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Private
                                        </Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.privacy && (
                            <p className="text-sm text-red-500">{errors.privacy.message}</p>
                        )}
                    </div>

                    {/* Group Size Input */}
                    <div className="space-y-2">
                        <Label htmlFor="groupSize" className="text-gray-700 dark:text-gray-300">
                            Group Size
                        </Label>
                        <Input
                            {...register("groupSize", { valueAsNumber: true })}
                            id="groupSize"
                            type="number"
                            placeholder="Enter group size"
                            className="w-full border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                        {errors.groupSize && (
                            <p className="text-sm text-red-500">{errors.groupSize.message}</p>
                        )}
                    </div>

                    {/* Root-Level Error */}
                    {errors.root && (
                        <div className="mx-auto mt-4 text-sm text-red-700" data-testid="root-error">
                            {errors.root.message}
                        </div>
                    )}

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
                                    Creating...
                                </>
                            ) : (
                                "Create Group"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default GroupDialog;
