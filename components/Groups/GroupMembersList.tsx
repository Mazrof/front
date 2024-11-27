import { useGroupMembers } from "@/hooks/useGroupMembers";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface GroupMembersDialogProps {
    groupId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function GroupMembersDialog({ groupId, isOpen, onClose }: GroupMembersDialogProps) {
    const { members, loading, error } = useGroupMembers(groupId);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Group Members</DialogTitle>
                </DialogHeader>
                <div className="max-h-80 space-y-4 overflow-y-auto">
                    {loading ? (
                        <>
                            {[...Array(5)].map((_, index) => (
                                <Skeleton key={index} className="h-6 w-full" />
                            ))}
                        </>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <ul className="space-y-2">
                            {members.map((member) => (
                                <li
                                    key={member.id}
                                    className="rounded-md border bg-gray-100 p-2 dark:bg-gray-800"
                                >
                                    {member.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={onClose} className="bg-blue-600">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
