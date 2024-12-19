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

// Zod schema for form validation
const groupSettingsSchema = z.object({
    privacy: z.boolean(),
    abilityToPost: z.enum(["No One", "members", "admins"]),
    downloadPermission: z.enum(["No One", "everyone", "admins"]),
    name: z.string().min(1, "Group name is required"),
    groupSize: z.number().min(1, "Group size must be at least 1"),
});

type GroupSettingsInputs = z.infer<typeof groupSettingsSchema>;

type GroupSettingsProps = {
    groupId: number;
    isOpen: boolean;
    privacy: boolean;
    groupSize: number;
    onClose: () => void;
};

export default function GroupSettings({
    groupId,
    privacy,
    groupSize,
    isOpen,
    onClose,
}: GroupSettingsProps) {
    const [error, setError] = useState<string | null>(null);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<GroupSettingsInputs>({
        resolver: zodResolver(groupSettingsSchema),
        defaultValues: {
            privacy,
            abilityToPost: "No One",
            downloadPermission: "No One",
            groupSize,
        },
    });

    const onSubmit: SubmitHandler<GroupSettingsInputs> = async (data) => {
        try {
            const response: genericResponse<object> = await updateGroupSettings(groupId, data);
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
                    Group Settings
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Group Settings</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label className="text-md text-gray-700 dark:text-gray-300">
                            Group Privacy
                        </Label>
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
                                        <RadioGroupItem value="true" id="public" />
                                        <Label htmlFor="public">Public</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="false" id="private" />
                                        <Label htmlFor="private">Private</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-md">Set Ability to Post, Edit, and Delete</Label>
                        <Controller
                            control={control}
                            name="abilityToPost"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="No One" id="No One" />
                                        <Label htmlFor="No One">No One</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="members" id="members" />
                                        <Label htmlFor="members">Members</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="admins" id="admins" />
                                        <Label htmlFor="admins">Admins</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-md">Set Who Can Download Video and Audio</Label>
                        <Controller
                            control={control}
                            name="downloadPermission"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="No One" id="no_download" />
                                        <Label htmlFor="no_download">No One</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="everyone" id="everyone" />
                                        <Label htmlFor="everyone">Everyone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="admins" id="admin_download" />
                                        <Label htmlFor="admin_download">Admins</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-md">Group Size</Label>
                        <Controller
                            control={control}
                            name="groupSize"
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
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
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-600">
                            {isSubmitting ? "Saving..." : "Save Settings"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
