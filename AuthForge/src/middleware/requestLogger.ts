import type { Request, Response, NextFunction } from "express";

export function requestLogger (
    req: Request,
    res: Response,
    next: NextFunction,
): void{
    const start = Date.now();

    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        const duration = Date.now() - start;

        console.log(
            `[RESPONSE] ${req.method} ${req.originalUrl}` +
            `${req.statusCode} ${duration}ms`
        );
    });
    next();
}