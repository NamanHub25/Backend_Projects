
import type {
  ErrorRequestHandler
} from "express";

import { AppError } from "../errors/AppError.js";

export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  if (res.headersSent) {
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    });
    return;
  }

  console.error("[UNEXPECTED_ERROR]", err);

  res.status(500).json({
    error: {
      message: "Internal server error"
    }
  });
};
