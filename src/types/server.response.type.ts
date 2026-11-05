export type IServerResponse<Data> = {
    success: true,
    status: number,
    data: Data,
} | {
    success: false,
    status: number,
    error: Omit<Error, "name" | "stack"> & { code?: number },
};