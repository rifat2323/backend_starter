/**
 * Checks if the given value is null or undefined.
 *
 * @param value - The value to check.
 * @returns True if the value is null or undefined, false otherwise.
 */
export const isNullOrUndefined = (value: any): boolean => {
    return value === null || value === undefined;
};

/**
 * Checks if the given value is an empty string.
 *
 * @param value - The value to check.
 * @returns True if the value is an empty string, false otherwise.
 */
export const isEmptyString = (value: any): boolean => {
    return typeof value === "string" && value.trim() === "";
};
/**
 * Checks if the given object is empty.
 *
 * @param obj - The object to check.
 * @returns True if the object has no own properties, false otherwise.
 */
export const isObjectEmpty = (obj: Record<string, any>): boolean => {
    return obj && Object.keys(obj).length === 0;
};
/**
 * Checks if the given string is a valid email address.
 *
 * The email address is valid if it contains only letters (a-z or A-Z), numbers (0-9), periods (.), hyphens (-), and underscores (_)
 * and also contains exactly one @ symbol and at least one period (.) after the @ symbol.
 *
 * @param email - The string to check.
 * @returns True if the string is a valid email address, false otherwise.
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
/**
 * Handles an asynchronous operation by wrapping the given promise in a try-catch block.
 *
 * @template T - The type of the resolved value of the promise.
 * @param promise - The promise to handle.
 * @returns A tuple where the first element is the resolved value of the promise or null if rejected,
 *          and the second element is the error caught if the promise is rejected, otherwise null.
 */

export const handleAsync = async <T>(promise: Promise<T>): Promise<[T | null, any]> => {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error];
    }
};
/**
 * Checks if the given string is a valid password.
 *
 * A valid password is a string that must contain at least one letter, one number, and one special character,
 * and must be at least 8 characters long.
 *
 * @param password - The string to check.
 * @returns True if the string is a valid password, false otherwise.
 */
export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

/**
 * Checks if the provided cursor is valid.
 *
 * A valid cursor is neither null nor undefined. If the cursor is a string,
 * it must not be an empty or whitespace-only string. If the cursor is a number,
 * it must be greater than zero.
 *
 * @param cursor - The cursor to validate.
 * @returns True if the cursor is valid, false otherwise.
 */
export const isValidCursor = (cursor: any): boolean => {
   
    if (cursor === null || cursor === undefined) {
        return false;
    }
    
   
    if (typeof cursor === 'string' && cursor.trim() === '') {
        return false;
    }

    
    if (typeof cursor === 'number' && cursor <= 0) {
        return false;
    }

    

    return true;
};


 