import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useState } from "react";
import { updateChannelSettings } from "@/services/Channel";
import { failResponse, genericResponse } from "@/types/api";

// Zod schema for form validation
const channelSettingsSchema = z.object({
    privacy: z.boolean(),
    abilityToComment: z.boolean(),
    downloadPermission: z.boolean(),
});

type ChannelSettingsInputs = z.infer<typeof channelSettingsSchema>;

type ChannelSettingsProps = {
    channelId: number;
    isOpen: boolean;
    canAddComments: boolean;
    privacy: boolean;
    onClose: () => void;
};

export default function ChannelSettingsDialog({
    channelId,
    canAddComments,
    privacy,
    isOpen,
    onClose,
}: ChannelSettingsProps) {
    const [error, setError] = useState<string | null>(null);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ChannelSettingsInputs>({
        resolver: zodResolver(channelSettingsSchema),
        defaultValues: {
            privacy,
            abilityToComment: canAddComments,
            downloadPermission: false,
        },
    });

    const onSubmit: SubmitHandler<ChannelSettingsInputs> = async (data) => {
        try {
            const response: genericResponse<object> = await updateChannelSettings(channelId, data);
            if (response.status === "success") {
                reset();
                onClose();
            } else {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            }
        } catch (err) {
            setError(`An unexpected error ${err} occurred. Please try again later.`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Channel Settings
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="channel-settings-description">
                <DialogHeader>
                    <DialogTitle>Channel Settings</DialogTitle>
                    <p id="channel-settings-description" className="text-sm text-gray-500">
                        Manage your channel&apos;s privacy, commenting, and download settings.
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                                            value="true"
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
                                            value="false"
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

                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">
                            Ability to Comment
                        </Label>
                        <Controller
                            control={control}
                            name="abilityToComment"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    defaultValue={field.value.toString()}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="false"
                                            id="no_comments"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="no_comments"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            No Comments
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="true"
                                            id="allow_comments"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="allow_comments"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Allow Comments
                                        </Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.abilityToComment && (
                            <p className="text-sm text-red-500">
                                {errors.abilityToComment.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">
                            Download Permission
                        </Label>
                        <Controller
                            control={control}
                            name="downloadPermission"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(value) => field.onChange(value === "true")}
                                    defaultValue={field.value.toString()}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="false"
                                            id="no_download"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="no_download"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            No Downloads
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="true"
                                            id="allow_download"
                                            className="text-blue-500 dark:text-blue-400"
                                        />
                                        <Label
                                            htmlFor="allow_download"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            Allow Downloads
                                        </Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {errors.downloadPermission && (
                            <p className="text-sm text-red-500">
                                {errors.downloadPermission.message}
                            </p>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="mr-2">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            {isSubmitting ? "Saving..." : "Save Settings"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
