export interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error?: string;
}

export function handleErrorResponse(error: any): ErrorResponse {
    if (error?.error instanceof Blob) {
        return {
            statusCode: error.status,
            message: "Ocurrió un error, pero no se puede leer el mensaje del Blob directamente aquí.",
        };
    } else if (error?.error?.message) {
        return {
            statusCode: error.status,
            message: error.error.message,
        };
    } else if (error?.status) {
        return {
            statusCode: error.status,
            message: error.statusText || "Error en la respuesta del servidor.",
        };
    } else if (error?.message) {
        return {
            statusCode: 0,
            message: error.message,
        };
    } else {
        return {
            statusCode: 500,
            message: "Ocurrió un error desconocido.",
        };
    }
}

