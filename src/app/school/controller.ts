import type { Request, Response } from "express";
import { SchoolsService } from "./service.js";
import { AddSchoolBodySchema, ListSchoolsQuerySchema } from "./validation.js";

export class SchoolsController {
  private readonly schoolsService = new SchoolsService();

  public addSchool = async (req: Request, res: Response) => {
    const body = AddSchoolBodySchema.parse(req.body);
    const created = await this.schoolsService.addSchool(body);
    return res.status(201).json(created);
  };

  public listSchools = async (req: Request, res: Response) => {
    const query = ListSchoolsQuerySchema.parse(req.query);
    const schools = await this.schoolsService.listSchools(query);
    return res.json({ userLocation: query, schools });
  };
}
