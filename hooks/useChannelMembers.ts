import { getChannelMembers } from "@/services/Channel";
import { successResponse } from "@/types/api";
import { useEffect, useState } from "react";

export interface Member {
    id: number;
    name: string;
}

export function useChannelMembers(channelId: number) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response = await getChannelMembers(channelId);
                if (response.status === "success") {
                    const successApiResponse = response as successResponse<object>;
                    setMembers(successApiResponse.data as Member[]);
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
    }, [channelId]);

    return { members, loading, error };
}
