import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema.js";
import { env } from "../env.js";
import { sql } from "drizzle-orm";

export const db = drizzle(env.DATABASE_URL, { schema, mode: "default" });

export async function connectToDb(): Promise<void> {
  await db.execute(sql`SELECT 1`);
  console.log("Database connection established");
}
