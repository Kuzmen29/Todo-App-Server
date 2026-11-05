export type IParsingResponse<Data> = {
    success: true,
    data: Data,
} | {
    success: false,
    error: Omit<Error, "name" | "stack"> & { code?: number },
};