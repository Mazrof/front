import { getGroupMembers } from "@/services/Group";
import { genericResponse, successResponse } from "@/types/api";
import { GroupMember } from "@/types/user";
import { useEffect, useState } from "react";

export function useGroupMembers(GroupId: number) {
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response: genericResponse<{ members: GroupMember[] }> =
                    await getGroupMembers(GroupId);
                if (response.status === "success") {
                    const successApiResponse = response as successResponse<{
                        members: GroupMember[];
                    }>;
                    setMembers(successApiResponse.data.members);
                } else {
                    setError("Failed to fetch members.");
                }
            } catch (err) {
                setError(`An error ${err} occurred while fetching members.`);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [GroupId]);

    return { members, loading, error };
}
