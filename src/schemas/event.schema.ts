import { z } from "zod";
import { userSchema } from "./user.schema";

export const eventTypeEnum = z.enum(["TRAINING", "SEMINAR", "CONFERENCE"]);

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable(),
  location: z.string().nullable(),
  type: eventTypeEnum,
  imageUrl: z.string().url().nullable(),
  organizer: z.string().nullable(),
  isPublished: z.boolean().nullable(),
  createdById: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const eventWithRelationsSchema = z.lazy(() =>
  eventSchema.extend({
    createdBy: userSchema,
  })
);

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(255, "O título é demasiado longo."),
  description: z
    .string()
    .max(2000, "A descrição é demasiado longa.")
    .optional()
    .nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  location: z.string().optional(),
  type: eventTypeEnum,
  imageUrl: z.string().url("URL inválido").optional(),
  organizer: z.string().optional(),
  isPublished: z.boolean().optional().default(false),
  createdById: z.string().min(1, "O ID do criador é obrigatório."),
});

export const updateEventSchema = createEventSchema.partial();
