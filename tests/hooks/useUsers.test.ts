import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "@/hooks/useUsers";
import { getAllUsers } from "@/services/Settings";
import { User } from "@/types/user";

// Mock the Settings service
jest.mock("@/services/Settings");

describe("useUsers", () => {
    const mockGetAllUsers = getAllUsers as jest.Mock;
    const mockUsers: User[] = [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
    ];

    beforeEach(() => {
        mockGetAllUsers.mockReset();
        // Mock console.error to prevent test output noise
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should fetch users successfully", async () => {
        mockGetAllUsers.mockResolvedValueOnce({
            status: "success",
            data: { users: mockUsers },
        });

        const { result } = renderHook(() => useUsers());

        // Initially loading
        expect(result.current.isLoading).toBe(true);
        expect(result.current.users).toEqual([]);
        expect(result.current.error).toBeNull();

        // After successful fetch
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.users).toEqual(mockUsers);
        expect(result.current.error).toBeNull();
        expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it("should handle API error response", async () => {
        const errorMessage = "Failed to fetch users";
        mockGetAllUsers.mockResolvedValueOnce({
            status: "fail",
            message: errorMessage,
        });

        const { result } = renderHook(() => useUsers());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.users).toEqual([]);
        expect(result.current.error).toBe(errorMessage);
        expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it("should handle network error", async () => {
        mockGetAllUsers.mockRejectedValueOnce(new Error("Network error"));

        const { result } = renderHook(() => useUsers());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.users).toEqual([]);
        expect(result.current.error).toBeNull(); // Error is only logged to console
        expect(mockGetAllUsers).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith("unexpected Error  happened");
    });

    it("should only fetch once on mount", async () => {
        mockGetAllUsers.mockResolvedValueOnce({
            status: "success",
            data: { users: mockUsers },
        });

        const { result, rerender } = renderHook(() => useUsers());

        // Wait for initial fetch
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Rerender should not trigger another fetch
        rerender();

        expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    });
});
