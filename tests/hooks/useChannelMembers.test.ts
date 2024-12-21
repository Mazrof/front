import { renderHook, waitFor } from "@testing-library/react";
import { useChannelMembers } from "@/hooks/useChannelMembers";
import { getChannelMembers } from "@/services/Channel";
import { ChannelMember } from "@/types/user";

// Mock the Channel service
jest.mock("@/services/Channel");

describe("useChannelMembers", () => {
    const mockGetChannelMembers = getChannelMembers as jest.Mock;
    const mockMembers: ChannelMember[] = [
        { id: 1, username: "user1", role: "admin" },
        { id: 2, username: "user2", role: "member" },
    ];

    beforeEach(() => {
        mockGetChannelMembers.mockReset();
    });

    it("should fetch channel members successfully", async () => {
        mockGetChannelMembers.mockResolvedValueOnce({
            status: "success",
            data: { members: mockMembers },
        });

        const { result } = renderHook(() => useChannelMembers(1));

        // Initially loading
        expect(result.current.loading).toBe(true);
        expect(result.current.members).toEqual([]);
        expect(result.current.error).toBeNull();

        // After successful fetch
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.members).toEqual(mockMembers);
        expect(result.current.error).toBeNull();
        expect(mockGetChannelMembers).toHaveBeenCalledWith(1);
    });

    it("should handle API error response", async () => {
        mockGetChannelMembers.mockResolvedValueOnce({
            status: "fail",
            message: "Failed to fetch members",
        });

        const { result } = renderHook(() => useChannelMembers(1));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.members).toEqual([]);
        expect(result.current.error).toBe("Failed to fetch members.");
        expect(mockGetChannelMembers).toHaveBeenCalledWith(1);
    });

    it("should handle network error", async () => {
        const error = new Error("Network error");
        mockGetChannelMembers.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useChannelMembers(1));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.members).toEqual([]);
        expect(result.current.error).toBe(`An error ${error} occurred while fetching members.`);
        expect(mockGetChannelMembers).toHaveBeenCalledWith(1);
    });

    it("should update when channelId changes", async () => {
        mockGetChannelMembers
            .mockResolvedValueOnce({
                status: "success",
                data: { members: mockMembers },
            })
            .mockResolvedValueOnce({
                status: "success",
                data: { members: [mockMembers[0]] },
            });

        const { result, rerender } = renderHook(
            (props) => useChannelMembers(props),
            {
                initialProps: 1,
            }
        );

        // Wait for first fetch
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.members).toEqual(mockMembers);

        // Change channelId
        rerender(2);

        // Wait for second fetch
        await waitFor(() => {
            expect(result.current.members).toEqual([mockMembers[0]]);
        });

        expect(mockGetChannelMembers).toHaveBeenCalledTimes(2);
        expect(mockGetChannelMembers).toHaveBeenCalledWith(1);
        expect(mockGetChannelMembers).toHaveBeenCalledWith(2);
    });
});
