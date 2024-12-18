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
import { Loader2 } from "lucide-react";
import { createChannel } from "@/services/Channel";
import { failResponse, genericResponse } from "@/types/api";
import { useUsers } from "@/hooks/useUsers";
import { ChannelData } from "@/types/channel";

const channelSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Channel name must be at least 3 characters" })
        .max(50, { message: "Channel name cannot exceed 50 characters" }),
    privacy: z.boolean(),
    canAddComments: z.boolean(),
    admins: z.array(z.string()),
});

function ChannelDialog() {
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
        resolver: zodResolver(channelSchema),
        defaultValues: {
            name: "",
            privacy: false,
            canAddComments: true,
            admins: [],
        },
    });
    const setErrorRoot = (message: string) => {
        setError("root", {
            type: "manual",
            message: message,
        });
    };
    const onSubmit = async (data: z.infer<typeof channelSchema>) => {
        const response: genericResponse<{ channel: ChannelData }> = await createChannel(data);
        console.log(response);
        if (response.status === "success") {
            reset();
            setIsOpen(false);
        } else {
            const failApiResponse = response as failResponse;
            setErrorRoot(failApiResponse.message);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full font-medium hover:bg-gray-200">
                    New Channel
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-[425px]">
                <DialogHeader>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create a New Channel
                    </h2>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                            Channel Name
                        </Label>
                        <Input
                            {...register("name")}
                            id="name"
                            placeholder="Enter channel name"
                            className="w-full border-gray-300 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            data-test="channel-name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500" data-test="channel-name-error">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Channel Privacy</Label>
                        <Controller
                            control={control}
                            name="privacy"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    defaultValue={field.value.toString()}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="false"
                                            id="public"
                                            className="text-blue-500 dark:text-blue-400"
                                            data-test="channel-privacy-public"
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
                                            data-test="channel-privacy-private"
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

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            {...register("canAddComments")}
                            id="canAddComments"
                            className="text-blue-500 dark:text-blue-400"
                            data-test="channel-canAddComments"
                        />
                        <Label
                            htmlFor="canAddComments"
                            className="text-gray-700 dark:text-gray-300"
                        >
                            Allow comments in the channel
                        </Label>
                    </div>

                    <div className="max-h-[200px] space-y-2 overflow-y-auto">
                        <Label className="text-gray-700 dark:text-gray-300">Select Admins</Label>
                        {isLoading ? (
                            <p>Loading users...</p>
                        ) : (
                            <div className="space-y-2">
                                {users.map((member) => (
                                    <div key={member.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            {...register("admins")}
                                            value={member.id?.toString()}
                                            id={`admin-${member.id}`}
                                            className="text-blue-500 dark:text-blue-400"
                                            data-test="channel-selectAdmins"
                                        />
                                        <Label
                                            htmlFor={`admin-${member.id}`}
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            {member.username}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.admins && (
                            <p className="text-sm text-red-500">{errors.admins.message}</p>
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
                                data-test="channel-cancelButton"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                            data-test="channel-createButton"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Channel"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ChannelDialog;
