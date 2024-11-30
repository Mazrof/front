import { getGroupMembers } from "@/services/Group";
import { successResponse } from "@/types/api";
import { Member } from "@/types/user";
import { useEffect, useState } from "react";

export function useGroupMembers(GroupId: number) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response = await getGroupMembers(GroupId);
                if (response.status === "success") {
                    const successApiResponse = response as successResponse<{ members: Member[] }>;
                    console.log(successApiResponse.data);
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
