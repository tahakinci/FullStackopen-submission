import z from "zod";

const BaseEntrySchema = z.object({
  // id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const HospitalEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.coerce.number(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type EntryType = Entry["type"];

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRist" = 3,
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type Entry = z.infer<typeof NewEntrySchema>;
export type EntryFormValues = UnionOmit<Entry, "id">;
