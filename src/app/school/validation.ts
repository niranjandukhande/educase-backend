import { z } from "zod";

export const AddSchoolBodySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  address: z.string().trim().min(1, "address is required"),
  latitude: z.coerce
    .number()
    .min(-90, "latitude must be between -90 and 90")
    .max(90, "latitude must be between -90 and 90"),
  longitude: z.coerce
    .number()
    .min(-180, "longitude must be between -180 and 180")
    .max(180, "longitude must be between -180 and 180"),
});

export const ListSchoolsQuerySchema = z.object({
  latitude: z.coerce
    .number()
    .min(-90, "latitude must be between -90 and 90")
    .max(90, "latitude must be between -90 and 90"),
  longitude: z.coerce
    .number()
    .min(-180, "longitude must be between -180 and 180")
    .max(180, "longitude must be between -180 and 180"),
});

export type AddSchoolBody = z.infer<typeof AddSchoolBodySchema>;
export type ListSchoolsQuery = z.infer<typeof ListSchoolsQuerySchema>;
