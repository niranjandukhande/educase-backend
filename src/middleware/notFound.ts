import type { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  return res.status(404).json({
    error: "NOT_FOUND",
    message: `The route '${req.method} ${req.originalUrl}' is not available.`,
  });
}
