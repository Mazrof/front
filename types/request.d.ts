export type ApiRequest = {
    endpoint: string;
    method: HTTPMethod;
    credentials?: "include";
    body?: unknown;
    cache: "force-cache" | "no-store" | "no-cache";
    revalidate?: number;
    headers?: Record<string, string>;
};
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
