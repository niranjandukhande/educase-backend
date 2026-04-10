import { float, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const schools = mysqlTable("schools", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 1024 }).notNull(),
  latitude: float("latitude").notNull(),
  longitude: float("longitude").notNull(),
});

export type School = typeof schools.$inferSelect;
export type NewSchool = typeof schools.$inferInsert;
