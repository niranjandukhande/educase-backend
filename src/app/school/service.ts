import type { School } from "../../db/schema.js";
import type { AddSchoolBody, ListSchoolsQuery } from "./validation.js";
import { SchoolsRepository } from "./repository.js";

export type SchoolWithDistanceKm = School & { distanceKm: number };

export class SchoolsService {
  private readonly schoolsRepository = new SchoolsRepository();

  async addSchool(body: AddSchoolBody): Promise<School> {
    return this.schoolsRepository.createSchool(body);
  }

  async listSchools(query: ListSchoolsQuery): Promise<SchoolWithDistanceKm[]> {
    const rows = await this.schoolsRepository.listSchoolsByDistance({
      userLatitude: query.latitude,
      userLongitude: query.longitude,
    });

    return rows.map(({ distanceM, ...school }) => ({
      ...school,
      distanceKm: distanceM / 1000,
    }));
  }
}
