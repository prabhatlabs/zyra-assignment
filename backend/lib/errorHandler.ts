import type { ApiResponse } from "@zyra-ass/shared"
import { type NextFunction, type Request, type Response } from "express"
import { logger } from "./logger"

export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) {
    logger.error(
        { requestId: req.requestId, err },
        `[${req.requestId}] Unhandled error: ${err.message}`,
    )

    const status = 500

    res.status(status).json({
        status,
        message: "Internal Server Error",
        data: null,
        error: "Internal Server Error",
    } satisfies ApiResponse)
}
