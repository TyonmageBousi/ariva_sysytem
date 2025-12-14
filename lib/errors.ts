//サンプル

export class AppError extends Error {
    statusCode: number;
    errorType: string;
    details?: unknown;

    constructor(params: { message: string; statusCode: number; errorType: string; details?: unknown }) {
        super(params.message);
        this.statusCode = params.statusCode;
        this.errorType = params.errorType;
        this.details = params.details;
    }
}


export class ValidationError extends AppError {
    constructor(details?: unknown) {
        super({
            message: "入力内容に誤りがあります。",
            statusCode: 400,
            errorType: "VALIDATION_ERROR",
            details,
        });
    }
}

export class AuthError extends AppError {
    constructor() {
        super({
            message: "ログインが必要です。",
            statusCode: 401,
            errorType: "UNAUTHORIZED",
        });
    }
}


export function handleError(e: unknown): Response {
    console.error(e);

    if (e instanceof AppError) {
        return Response.json(
            {
                success: false,
                errorType: e.errorType,
                message: e.message,
                details: e.details,
            },
            { status: e.statusCode },
        );
    }

    return Response.json(
        {
            success: false,
            errorType: "INTERNAL_SERVER_ERROR",
            message: "サーバーでエラーが発生しました。時間をおいて再度お試しください。",
        },
        { status: 500 },
    );
}
