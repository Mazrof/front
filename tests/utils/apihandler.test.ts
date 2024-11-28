import apiHandler from '@/lib/apiHandler';
import { ApiRequest } from '@/types/request';

// Mocking fetch globally for tests
global.fetch = jest.fn();

describe('apiHandler', () => {
    const mockEndpoint = 'https://api.example.com/data';
    const mockMethod = 'POST';
    const mockHeaders = { Authorization: 'Bearer token' };
    const mockBody = { key: 'value' };
    const mockResponseData = { success: true };
    const mockErrorMessage = { message: 'Some error occurred' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should make a successful API request and return data', async () => {
        // Mock fetch to return a successful response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        const request: ApiRequest = {
            endpoint: mockEndpoint,
            method: mockMethod,
            headers: mockHeaders,
            body: mockBody,
            cache: 'no-cache',
            revalidate: 10
        };

        const data = await apiHandler(request);

        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
            method: mockMethod,
            headers: {
                'Content-Type': 'application/json',
                ...mockHeaders,
            },
            body: JSON.stringify(mockBody),
            revalidate: 10,
            cache: 'no-cache',
        });
        expect(data).toEqual(mockResponseData);
    });

    it('should throw an error if the response is not ok', async () => {
        // Mock fetch to return a failed response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValueOnce(mockErrorMessage),
        });

        const request: ApiRequest = {
            endpoint: mockEndpoint,
            method: mockMethod,
            headers: mockHeaders,
            body: mockBody,
            cache: 'no-cache',
            revalidate: 20
        };

        await expect(apiHandler(request)).rejects.toThrowError(
            mockErrorMessage.message
        );

        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
            method: mockMethod,
            headers: {
                'Content-Type': 'application/json',
                ...mockHeaders,
            },
            body: JSON.stringify(mockBody),
            revalidate: 20,
            cache: 'no-cache',
        });
    });

    it('should log an error and throw if fetch fails (network error)', async () => {
        // Mock fetch to simulate a network failure
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const request: ApiRequest = {
            endpoint: mockEndpoint,
            method: mockMethod,
            headers: mockHeaders,
            body: mockBody,
            cache: 'no-cache',
            revalidate: 0
        };

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await expect(apiHandler(request)).rejects.toThrowError('Network error');

        // Ensure the error is logged
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            `An error occurred while Call this Endpoint: ${mockEndpoint}`
        );

        consoleErrorSpy.mockRestore();
    });

    it('should call fetch without body when body is not provided', async () => {
        // Mock fetch to return a successful response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        const request: ApiRequest = {
            endpoint: mockEndpoint,
            method: mockMethod,
            headers: mockHeaders,
            body: undefined, // No body
            cache: 'no-cache',
            revalidate: 10
        };

        await apiHandler(request);

        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
            method: mockMethod,
            headers: {
                'Content-Type': 'application/json',
                ...mockHeaders,
            },
            revalidate: 10,
            cache: 'no-cache',
        });
    });

    it('should handle revalidate and cache options', async () => {
        // Mock fetch to return a successful response
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponseData),
        });

        const request: ApiRequest = {
            endpoint: mockEndpoint,
            method: mockMethod,
            headers: mockHeaders,
            body: mockBody,
            cache: 'force-cache',
            revalidate: 0
        };

        await apiHandler(request);

        expect(fetch).toHaveBeenCalledWith(mockEndpoint, {
            method: mockMethod,
            headers: {
                'Content-Type': 'application/json',
                ...mockHeaders,
            },
            body: JSON.stringify(mockBody),
            revalidate: 0,
            cache: 'force-cache',
        });
    });
});
