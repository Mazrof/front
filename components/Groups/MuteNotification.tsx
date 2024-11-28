import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { muteNotification } from "@/services/Group";
import { genericResponse, successResponse } from "@/types/api";
import { DialogTrigger } from "@radix-ui/react-dialog";

const muteSchema = z.object({
    muteDuration: z.enum(["1h", "4h", "8h", "1d", "3d", "forever"], {
        errorMap: () => ({ message: "Please select a valid mute option" }),
    }),
});

type MuteFormValues = z.infer<typeof muteSchema>;

const muteOptions = [
    { label: "Mute for 1 hour", value: "1h" },
    { label: "Mute for 4 hours", value: "4h" },
    { label: "Mute for 8 hours", value: "8h" },
    { label: "Mute for 1 day", value: "1d" },
    { label: "Mute for 3 days", value: "3d" },
    { label: "Mute Forever", value: "forever" },
];
type MuteNotificationProps = {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
};
export default function MuteNotification({ groupId, isOpen, onClose }: MuteNotificationProps) {
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<MuteFormValues>({
        resolver: zodResolver(muteSchema),
        defaultValues: {
            muteDuration: "forever",
        },
    });

    const onSubmit = async (muteDuration: MuteFormValues) => {
        setLoading(true);
        try {
            const response: genericResponse<object> = await muteNotification(groupId, {
                muteDuration,
            });
            if (response.status === "success")
                console.log((response as successResponse<object>).data);
        } catch (error) {
            console.error("Failed to mute notifications:", error);
        } finally {
            onClose();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogTrigger>Mute Notifications</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notifications</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Controller
                                name="muteDuration"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup
                                        {...field}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="space-y-2"
                                    >
                                        {muteOptions.map((option) => (
                                            <label
                                                key={option.value}
                                                className="flex cursor-pointer items-center space-x-2"
                                            >
                                                <RadioGroupItem value={option.value} />
                                                <span>{option.label}</span>
                                            </label>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            {errors.muteDuration && (
                                <p className="text-sm text-red-500">
                                    {errors.muteDuration.message}
                                </p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => onClose()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading} className="bg-blue-600">
                                {loading ? "Saving..." : "Done"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
