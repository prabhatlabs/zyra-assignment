import { type Request, type Response, type NextFunction } from "express"
import type { ApiResponse } from "@zyra-ass/shared"
import { logger } from "./logger"

export function asyncHandler<T>(
    fn: (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => Promise<ApiResponse<T>>,
) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .then((apiRes) => {
                res.status(apiRes.status).json(apiRes)
            })
            .catch((err: unknown) => {
                logger.error({ requestId: req.requestId, err }, `[${req.requestId}] ${req.method} ${req.path}: ${err instanceof Error ? err.message : err}`)

                res.status(500).json({
                    status: 500,
                    message: "Internal Server Error",
                    data: null,
                    error: "Internal Server Error",
                } satisfies ApiResponse)
            })
    }
}
