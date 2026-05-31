import { type Request, type Response, type NextFunction } from "express"
import { logger } from "./logger"

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    res.on("finish", () => {
        logger.info(
            {
                requestId: req.requestId,
                method: req.method,
                path: req.path,
                status: res.statusCode,
                duration: `${Date.now() - start}ms`,
            },
            `[${req.requestId}] ${req.method} ${req.path} ${res.statusCode}`,
        )
    })
    next()
}
