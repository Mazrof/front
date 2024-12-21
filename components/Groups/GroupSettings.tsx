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
import { updateGroupSettings } from "@/services/Group"; // Hypothetical service
import { failResponse, genericResponse } from "@/types/api";
import { convertToBase64 } from "@/utils/inputMessage";
import Image from "next/image";
// Zod schema for form validation
const groupSettingsSchema = z.object({
    name: z.string().min(1, "Group name is required."),
    privacy: z.boolean(),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, "Image size must be less than 5MB."),
    groupSize: z.number().min(1, "Group size must be at least 1"),
});

type GroupSettingsInputs = z.infer<typeof groupSettingsSchema>;

type GroupSettingsProps = {
    groupId: number;
    isOpen: boolean;
    privacy: boolean;
    groupSize: number;
    name: string;
    imageURL: string;
    onClose: () => void;
};

export default function GroupSettings({
    groupId,
    privacy,
    groupSize,
    name,
    imageURL,
    isOpen,
    onClose,
}: GroupSettingsProps) {
    const [error, setError] = useState<string | null>(null);
    const {
        control,
        watch,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<GroupSettingsInputs>({
        resolver: zodResolver(groupSettingsSchema),
        defaultValues: {
            name,
            privacy,
            groupSize,
        },
    });
    console.log(watch());
    const watchedImage: File = watch("image");
    const imagePath =
        watchedImage && watchedImage.size > 0 ? URL.createObjectURL(watchedImage) : imageURL;

    const onSubmit: SubmitHandler<GroupSettingsInputs> = async (data) => {
        try {
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
                imageURL: base64 || imageURL,
                groupSize: data.groupSize,
            };
            console.log(body);
            const response: genericResponse<object> = await updateGroupSettings(groupId, body);

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
                    Group Settings
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="group-settings-description">
                <DialogHeader>
                    <DialogTitle>Group Settings</DialogTitle>
                    <p id="group-settings-description" className="text-sm text-gray-500">
                        Manage your group&apos;s settings.
                    </p>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-700 dark:text-gray-300">Group Name</Label>
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
                        <Label className="text-gray-700 dark:text-gray-300">Group Image</Label>
                        <Image
                            width={64}
                            height={64}
                            src={imagePath}
                            alt="Channel"
                            className="h-16 w-16 rounded-full object-cover"
                        />
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
                        <Label className="text-gray-700 dark:text-gray-300">Group Privacy</Label>
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
                        <Label className="text-gray-700 dark:text-gray-300">Group Size</Label>
                        <Controller
                            control={control}
                            name="groupSize"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    className="mx-3 max-w-[100px] rounded-md border border-black px-2 shadow-sm focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800"
                                    placeholder="Enter group size"
                                />
                            )}
                        />
                        {errors.groupSize && (
                            <p className="text-sm text-red-500">{errors.groupSize.message}</p>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
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
