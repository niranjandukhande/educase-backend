import { asc, eq, sql } from "drizzle-orm";
import { AppError } from "../../middleware/errorHandler.js";
import { db } from "../../db/client.js";
import { schools, type NewSchool, type School } from "../../db/schema.js";

export type SchoolWithDistanceMeters = School & { distanceM: number };

export class SchoolsRepository {
  async createSchool(values: NewSchool): Promise<School> {
    const [inserted] = await db.insert(schools).values(values).$returningId();
    const id = inserted?.id;
    if (!id) {
      throw new AppError({
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Failed to create school",
      });
    }

    const [created] = await db
      .select()
      .from(schools)
      .where(eq(schools.id, id))
      .limit(1);

    if (!created) {
      throw new AppError({
        statusCode: 500,
        errorCode: "INTERNAL_ERROR",
        message: "Failed to load created school",
      });
    }

    return created;
  }

  async listSchoolsByDistance(params: {
    userLatitude: number;
    userLongitude: number;
  }): Promise<SchoolWithDistanceMeters[]> {
    const { userLatitude, userLongitude } = params;

    const distanceM = sql<number>`ST_Distance_Sphere(
      POINT(${schools.longitude}, ${schools.latitude}),
      POINT(${userLongitude}, ${userLatitude})
    )`;

    return db
      .select({
        id: schools.id,
        name: schools.name,
        address: schools.address,
        latitude: schools.latitude,
        longitude: schools.longitude,
        distanceM,
      })
      .from(schools)
      .orderBy(asc(distanceM));
  }
}
