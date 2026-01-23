import { Gender, NewPatientEntry } from "../types";
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