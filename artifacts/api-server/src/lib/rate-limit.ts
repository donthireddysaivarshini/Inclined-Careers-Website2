import type { Request, Response, NextFunction } from "express";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();

export function submissionRateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const now = Date.now();
  const key = req.ip || "unknown";
  const recent = (requests.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS) {
    res.status(429).json({
      error: "Too many submissions. Please try again later.",
    });
    return;
  }

  recent.push(now);
  requests.set(key, recent);
  next();
}
