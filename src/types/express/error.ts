import { Request, Response, NextFunction } from "express";
export interface SyntaxErrorWithStatus extends SyntaxError {
    status?: number;
    body?: unknown;
}

export interface ErrorRequestHandler {
    (err: SyntaxErrorWithStatus, req: Request, res: Response, next: NextFunction): void;
}