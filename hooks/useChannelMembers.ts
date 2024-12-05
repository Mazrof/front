import { getChannelMembers } from "@/services/Channel";
import { genericResponse, successResponse } from "@/types/api";
import { ChannelMember } from "@/types/user";
import { useEffect, useState } from "react";

export function useChannelMembers(channelId: number) {
    const [members, setMembers] = useState<ChannelMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                const response: genericResponse<{ members: ChannelMember[] }> =
                    await getChannelMembers(channelId);
                if (response.status === "success") {
                    const successApiResponse = response as successResponse<{
                        members: ChannelMember[];
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
    }, [channelId]);

    return { members, loading, error };
}
