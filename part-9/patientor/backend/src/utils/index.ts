import { Gender, HealthCheckRating, NewPatientEntry } from "../types";
import { z } from "zod";

export const NewPatientSchema = z.object({
    name: z.string().min(1, "name property cannot be empty"),
    dateOfBirth: z.iso.date(),
    ssn: z.string().min(1),
    gender: z.enum(Gender),
    occupation: z.string().min(1)
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(object);
};

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
}).strict();

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string()
    })
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z
        .object({
            startDate: z.string().date(),
            endDate: z.string().date(),
        })
        .optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.enum(HealthCheckRating)
});

export const NewEntrySchema = z.discriminatedUnion("type", [
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
    HealthCheckEntrySchema
]);