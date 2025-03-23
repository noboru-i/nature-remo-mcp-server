export class NatureRemoError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly response: unknown
    ) {
        super(message);
        this.name = "NatureRemoError";
    }
}

export class NatureRemoValidationError extends NatureRemoError {
    constructor(message: string, status: number, response: unknown) {
        super(message, status, response);
        this.name = "NatureRemoValidationError";
    }
}

export class NatureRemoResourceNotFoundError extends NatureRemoError {
    constructor(resource: string) {
        super(`Resource not found: ${resource}`, 404, { message: `${resource} not found` });
        this.name = "NatureRemoResourceNotFoundError";
    }
}

export class NatureRemoAuthenticationError extends NatureRemoError {
    constructor(message = "Authentication failed") {
        super(message, 401, { message });
        this.name = "NatureRemoAuthenticationError";
    }
}

export class NatureRemoPermissionError extends NatureRemoError {
    constructor(message = "Insufficient permissions") {
        super(message, 403, { message });
        this.name = "NatureRemoPermissionError";
    }
}

export class NatureRemoRateLimitError extends NatureRemoError {
    constructor(
        message = "Rate limit exceeded",
        public readonly resetAt: Date
    ) {
        super(message, 429, { message, reset_at: resetAt.toISOString() });
        this.name = "NatureRemoRateLimitError";
    }
}

export class NatureRemoConflictError extends NatureRemoError {
    constructor(message: string) {
        super(message, 409, { message });
        this.name = "NatureRemoConflictError";
    }
}

export function isNatureRemoError(error: unknown): error is NatureRemoError {
    return error instanceof NatureRemoError;
}

export function createNatureRemoError(status: number, response: any): NatureRemoError {
    switch (status) {
        case 401:
            return new NatureRemoAuthenticationError(response?.message);
        case 403:
            return new NatureRemoPermissionError(response?.message);
        case 404:
            return new NatureRemoResourceNotFoundError(response?.message || "Resource");
        case 409:
            return new NatureRemoConflictError(response?.message || "Conflict occurred");
        case 422:
            return new NatureRemoValidationError(
                response?.message || "Validation failed",
                status,
                response
            );
        case 429:
            return new NatureRemoRateLimitError(
                response?.message,
                new Date(response?.reset_at || Date.now() + 60000)
            );
        default:
            return new NatureRemoError(
                response?.message || "NatureRemo API error",
                status,
                response
            );
    }
}