import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.js";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "mysql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
