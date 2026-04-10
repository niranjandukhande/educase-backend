import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export type ValidationDetail = {
  field: string;
  message: string;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly details?: unknown;

  constructor(params: {
    statusCode: number;
    errorCode: string;
    message: string;
    details?: unknown;
  }) {
    super(params.message);
    this.name = "AppError";
    this.statusCode = params.statusCode;
    this.errorCode = params.errorCode;
    this.details = params.details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const details = error.issues.map((issue) => ({
      field: issue.path.join(".") || "request",
      message: issue.message,
    }));

    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid request",
      details,
    });
  }

  if (isAppError(error)) {
    return res.status(error.statusCode).json({
      error: error.errorCode,
      message: error.message,
      details: error.details,
    });
  }

  console.error("Unhandled error:", error);
  return res.status(500).json({ error: "INTERNAL_ERROR" });
}
