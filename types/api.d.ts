type statusType = "fail" | "success";
type failResponse = {
    message: string;
    status: statusType;
    stack: "string";
    error: {
        statusCode: number;
        status: statusType;
        isOperational: boolean;
    };
};
type successResponse<T> = {
    status: statusType;
    data: T;
};
export type genericResponse<T> = failResponse | successResponse<T>;
