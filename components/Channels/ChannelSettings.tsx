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
import { convertToBase64 } from "@/utils/inputMessage";

// Zod schema for form validation
const channelSettingsSchema = z.object({
    name: z.string().min(1, "Channel name is required."),
    privacy: z.boolean(),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, "Image size must be less than 5MB."),
    canAddComments: z.boolean(),
});

type ChannelSettingsInputs = z.infer<typeof channelSettingsSchema>;

type ChannelSettingsProps = {
    channelId: number;
    isOpen: boolean;
    canAddComments: boolean;
    privacy: boolean;
    name: string;
    imageURL: string;
    onClose: () => void;
};

export default function ChannelSettingsDialog({
    channelId,
    canAddComments,
    privacy,
    name,
    imageURL,
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
            name,
            image: imageURL,
            privacy,
            canAddComments,
        },
    });

    const onSubmit: SubmitHandler<ChannelSettingsInputs> = async (data) => {
        try {
            // Await the base64 conversion and handle the null case
            const base64 = await new Promise<string>((resolve, reject) => {
                convertToBase64(data.image, (base64, error) => {
                    if (error) {
                        reject("Can't Convert the image to base64");
                    } else if (base64 === null) {
                        reject("The image could not be converted to base64 (received null).");
                    } else {
                        resolve(base64);
                    }
                });
            });

            const body = {
                name: data.name,
                privacy: data.privacy,
                imageURL: base64,
                canAddComments: data.canAddComments,
            };

            const response: genericResponse<object> = await updateChannelSettings(channelId, body);

            if (response.status === "success") {
                reset();
                onClose();
            } else {
                const failApiResponse = response as failResponse;
                setError(failApiResponse.message);
            }
        } catch (err) {
            setError(`An unexpected error occurred: ${err}. Please try again later.`);
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
                        Manage your channel&apos;s settings.
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Channel Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Channel Image</Label>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 dark:file:bg-blue-700 dark:hover:file:bg-blue-800"
                                />
                            )}
                        />
                        {errors.image && (
                            <p className="text-sm text-red-500">{errors.image.message}</p>
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
                            name="canAddComments"
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
                        {errors.canAddComments && (
                            <p className="text-sm text-red-500">{errors.canAddComments.message}</p>
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
