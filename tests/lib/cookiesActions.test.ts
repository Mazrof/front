import { cookies } from "next/headers";
import { setCookies, deleteCookies, checkCookies, getCookies } from "@/lib/cookiesActions";

// Mock next/headers
jest.mock("next/headers", () => ({
    cookies: jest.fn(),
}));

describe("cookiesActions", () => {
    let mockCookieStore: {
        set: jest.Mock<void, [string, string]>;
        delete: jest.Mock<void, [string]>;
        has: jest.Mock<boolean, [string]>;
        get: jest.Mock<{ value: string } | null, [string]>;
    };

    beforeEach(() => {
        mockCookieStore = {
            set: jest.fn<void, [string, string]>(),
            delete: jest.fn<void, [string]>(),
            has: jest.fn<boolean, [string]>(),
            get: jest.fn<{ value: string } | null, [string]>(),
        };
        (cookies as jest.Mock).mockReturnValue(mockCookieStore);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("setCookies", () => {
        it("should set multiple cookies correctly", async () => {
            const testData = {
                key1: "value1",
                key2: "value2",
            };

            await setCookies(testData);

            expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
            expect(mockCookieStore.set).toHaveBeenCalledWith("key1", "value1");
            expect(mockCookieStore.set).toHaveBeenCalledWith("key2", "value2");
        });
    });

    describe("deleteCookies", () => {
        it("should delete multiple cookies correctly", async () => {
            const keysToDelete = ["key1", "key2"];

            await deleteCookies(keysToDelete);

            expect(mockCookieStore.delete).toHaveBeenCalledTimes(2);
            expect(mockCookieStore.delete).toHaveBeenCalledWith("key1");
            expect(mockCookieStore.delete).toHaveBeenCalledWith("key2");
        });
    });

    describe("checkCookies", () => {
        it("should return true when all cookies exist", async () => {
            mockCookieStore.has.mockReturnValue(true);
            const keysToCheck = ["key1", "key2"];

            const result = await checkCookies(keysToCheck);

            expect(result).toBe(true);
            expect(mockCookieStore.has).toHaveBeenCalledTimes(2);
            expect(mockCookieStore.has).toHaveBeenCalledWith("key1");
            expect(mockCookieStore.has).toHaveBeenCalledWith("key2");
        });

        it("should return false when any cookie does not exist", async () => {
            mockCookieStore.has
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(false);
            const keysToCheck = ["key1", "key2"];

            const result = await checkCookies(keysToCheck);

            expect(result).toBe(false);
            expect(mockCookieStore.has).toHaveBeenCalledTimes(2);
        });
    });

    describe("getCookies", () => {
        it("should get multiple cookies correctly", async () => {
            mockCookieStore.get
                .mockReturnValueOnce({ value: "value1" })
                .mockReturnValueOnce({ value: "value2" });
            const keysToGet = ["key1", "key2"];

            const result = await getCookies(keysToGet);

            expect(result).toEqual({
                key1: "value1",
                key2: "value2",
            });
            expect(mockCookieStore.get).toHaveBeenCalledTimes(2);
            expect(mockCookieStore.get).toHaveBeenCalledWith("key1");
            expect(mockCookieStore.get).toHaveBeenCalledWith("key2");
        });

        it("should handle non-existent cookies", async () => {
            mockCookieStore.get
                .mockReturnValueOnce({ value: "value1" })
                .mockReturnValueOnce(null);
            const keysToGet = ["key1", "key2"];

            const result = await getCookies(keysToGet);

            expect(result).toEqual({
                key1: "value1",
                key2: null,
            });
        });
    });
});
