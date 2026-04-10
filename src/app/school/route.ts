import { Router } from "express";
import { SchoolsController } from "./controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const controller = new SchoolsController();

export const schoolsRouter: Router = Router();

schoolsRouter.get("/listSchools", asyncHandler(controller.listSchools));
schoolsRouter.post("/addSchool", asyncHandler(controller.addSchool));
