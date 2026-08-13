// errors/BaseErrors.ts
export interface ErrorMessages {
    [key: string]: string;
}

export const RegisterErrors: ErrorMessages = {
    EMAIL_ALREADY_USED: "Warning: E-Mail Address is already registered!",
    OUT_OF_STOCK_ERROR: "Products marked with *** are not available in the desired quantity or not in stock!"
}