import { renderHook, waitFor } from "@testing-library/react";
import { useGroupMembers } from "@/hooks/useGroupMembers";
import { getGroupMembers } from "@/services/Group";
import { GroupMember } from "@/types/user";

// Mock the Group service
jest.mock("@/services/Group");

describe("useGroupMembers", () => {
    const mockGetGroupMembers = getGroupMembers as jest.Mock;
    const mockMembers: GroupMember[] = [
        { id: 1, username: "user1", role: "admin" },
        { id: 2, username: "user2", role: "member" },
    ];

    beforeEach(() => {
        mockGetGroupMembers.mockReset();
    });

    it("should fetch group members successfully", async () => {
        mockGetGroupMembers.mockResolvedValueOnce({
            status: "success",
            data: { members: mockMembers },
        });

        const { result } = renderHook(() => useGroupMembers(1));

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
        expect(mockGetGroupMembers).toHaveBeenCalledWith(1);
    });

    it("should handle API error response", async () => {
        mockGetGroupMembers.mockResolvedValueOnce({
            status: "fail",
            message: "Failed to fetch members",
        });

        const { result } = renderHook(() => useGroupMembers(1));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.members).toEqual([]);
        expect(result.current.error).toBe("Failed to fetch members.");
        expect(mockGetGroupMembers).toHaveBeenCalledWith(1);
    });

    it("should handle network error", async () => {
        const error = new Error("Network error");
        mockGetGroupMembers.mockRejectedValueOnce(error);

        const { result } = renderHook(() => useGroupMembers(1));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.members).toEqual([]);
        expect(result.current.error).toBe(`An error ${error} occurred while fetching members.`);
        expect(mockGetGroupMembers).toHaveBeenCalledWith(1);
    });

    it("should update when groupId changes", async () => {
        mockGetGroupMembers
            .mockResolvedValueOnce({
                status: "success",
                data: { members: mockMembers },
            })
            .mockResolvedValueOnce({
                status: "success",
                data: { members: [mockMembers[0]] },
            });

        const { result, rerender } = renderHook(
            (props) => useGroupMembers(props),
            {
                initialProps: 1,
            }
        );

        // Wait for first fetch
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });
        expect(result.current.members).toEqual(mockMembers);

        // Change groupId
        rerender(2);

        // Wait for second fetch
        await waitFor(() => {
            expect(result.current.members).toEqual([mockMembers[0]]);
        });

        expect(mockGetGroupMembers).toHaveBeenCalledTimes(2);
        expect(mockGetGroupMembers).toHaveBeenCalledWith(1);
        expect(mockGetGroupMembers).toHaveBeenCalledWith(2);
    });
});
