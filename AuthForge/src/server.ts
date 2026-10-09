
import express from "express";
import { requestLogger } from "./middleware/requestLogger";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandling.js";
import { AppError } from "./errors/AppError.js";
const app = express(); // Creates an express application

app.use(express.json()); // Adds middleware that parses incoming JSON requests

app.get("/health", (_req, res) => { // Registers a handler for HTTP GET requests to /health
    
  res.status(200).json({
    status: "ok",
    service: "authforge-api"
  });
});

app.get("/api/demo", (_req, res) => {
  res.status(200).json({
    message: "Request pass through Middleware pipeline"
  });
});

// Routes

app.get("/api/demo/users/:id", (req, res) => {
  res.json({
    userId: req.params.id
  });
});

app.get("/api/demo/search", (req, res) => {
  const searchTerm = req.query.q;

  res.json({
    searchTerm
  });
});

app.post("/api/demo/echo", (req, res) => {
  res.json({
   recieved: req.body
  });
});

// Challange A: Add GET /api/demo/status that returns { "status": "AuthForge is running" }.
app.get("/api/demo/status", (req, res) => {
  res.json({
    status: "AuthForge is running"
  });
});

// Challenge B: Add GET /api/demo/products/:id that returns the requested product ID and a query parameter called currency, defaulting to "INR" when omitted.

app.get("/api/demo/products/:id", (req,res) => {
  const productId = req.params.id;
  const currency = req.query.currency ?? "INR";

  res.json({
    productId,
    currency
  });
});

// Challenge C: Add a route that throws new AppError(403, "Access denied"). Verify that the centralized handler returns HTTP 403 rather than 500.

app.get("/api/demo/forbidden", (req, res, next) => {
  next(new AppError(403, "Access Denied"));
});

app.get("/api/demo/fail", () => {
  throw new AppError(400, "Demo request rejected");
});

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => { // Starts accepting HTTP connections on Port 3000
  console.log(`AuthForge API running on port ${PORT}`);
});


