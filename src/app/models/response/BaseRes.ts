export interface  BaseRes {
    statusCode : string,
    statusMessage : string,
    isSuccess: boolean,
    errors : [any]
}