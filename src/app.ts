import express from "express";
import type { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { schoolsRouter } from "./app/school/route.js";

export function createServerApplication(): Application {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/", (_req, res) => {
    return res.json({
      name: "Educase Backend (School APIs)",
      endpoints: {
        health: "GET /health",
        addSchool: "POST /addSchool",
        listSchools: "GET /listSchools?latitude=...&longitude=...",
      },
    });
  });

  app.get("/health", (_req, res) => {
    return res.json({ status: "ok" });
  });

  app.use(schoolsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
