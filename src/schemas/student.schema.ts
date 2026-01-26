import { z } from "zod";
import { userSchema } from "./user.schema";
import { qualificationSchema } from "./qualification.schema";

export const studentSchema = z.object({
  id: z.cuid().nullable(),
  code: z.string(),
  name: z.string(),
  gender: z.string().nullable(),
  scholarship: z.string().nullable(),
  financier: z.string().nullable(),
  qualificationName: z.string().nullable(),
  qualificationId: z.string().nullable(),
  specialty: z.string().nullable(),

  birthProvince: z.string().nullable(),
  birthDate: z.coerce.date().nullable().optional(),
  idNumber: z.coerce.string().nullable(),
  email: z.string().nullable(),
  phone1: z.coerce.string().nullable(),
  phone2: z.coerce.string().nullable(),
  fatherAffiliation: z.string().nullable(),
  motherAffiliation: z.string().nullable(),
  guardianName: z.string().nullable(),
  guardianAddress: z.string().nullable(),
  guardianPhone: z.coerce.string().nullable(),
  status: z.string().nullable(),
  actualProvince: z.string().nullable(),
  actualDistrict: z.string().nullable(),
  currentOccupation: z.string().nullable(),
  companyName: z.string().nullable(),
  companyPhone: z.coerce.string().nullable(),
  position: z.string().nullable(),
  startYear: z.coerce.string().nullable(),

  // Formation 1
  residencyRegime1: z.string().optional().nullable(),
  year1: z.coerce.string().optional().nullable(),
  level1: z.string().optional().nullable(),
  completionYear1: z.coerce.string().optional().nullable(),
  observation1: z.string().optional().nullable(),

  // Formation 2
  residencyRegime2: z.string().optional().nullable(),
  year2: z.coerce.string().optional().nullable(),
  level2: z.string().optional().nullable(),
  completionYear2: z.coerce.string().optional().nullable(),
  observation2: z.string().optional().nullable(),

  // Formation 3
  residencyRegime3: z.string().optional().nullable(),
  year3: z.coerce.string().optional().nullable(),
  level3: z.string().optional().nullable(),
  completionYear3: z.coerce.string().optional().nullable(),
  observation3: z.string().optional().nullable(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const userWithRelationsSchema = z.lazy(() =>
  userSchema.extend({
    qualification: qualificationSchema,
  })
);

export const createStudentSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  scholarship: z.string().min(1, "Scholarship is required"),
  financier: z.string().optional().nullable(),
  qualificationName: z.string(),
  qualificationId: z.string().min(1, "QualificationID is required"),
  specialty: z.string().optional().nullable(),

  birthProvince: z.string().optional().nullable(),
  birthDate: z.union([z.coerce.date(), z.date()]).optional().nullable(),
  idNumber: z.coerce.string().optional().nullable(),
  email: z.string().optional(),
  phone1: z.coerce.string().optional().nullable(),
  phone2: z.coerce.string().optional().nullable(),
  fatherAffiliation: z.string().optional().nullable(),
  motherAffiliation: z.string().optional().nullable(),
  guardianName: z.string().optional().nullable(),
  guardianAddress: z.string().optional().nullable(),
  guardianPhone: z.coerce.string().optional().nullable(),
  status: z.string().optional().nullable(),
  actualProvince: z.string().optional().nullable(),
  actualDistrict: z.string().optional().nullable(),
  currentOccupation: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  companyPhone: z.coerce.string().optional().nullable(),
  position: z.string().optional().nullable(),
  startYear: z.coerce.string().optional().nullable(),

  // Formation 1
  residencyRegime1: z.string().optional().nullable(),
  year1: z.coerce.string().optional().nullable(),
  level1: z.string().optional().nullable(),
  completionYear1: z.coerce.string().optional().nullable(),
  observation1: z.string().optional().nullable(),

  // Formation 2
  residencyRegime2: z.string().optional().nullable(),
  year2: z.coerce.string().optional().nullable(),
  level2: z.string().optional().nullable(),
  completionYear2: z.coerce.string().optional().nullable(),
  observation2: z.string().optional().nullable(),

  // Formation 3
  residencyRegime3: z.string().optional().nullable(),
  year3: z.coerce.string().optional().nullable(),
  level3: z.string().optional().nullable(),
  completionYear3: z.coerce.string().optional().nullable(),
  observation3: z.string().optional().nullable(),
});

export const updateStudentSchema = createStudentSchema.partial();
