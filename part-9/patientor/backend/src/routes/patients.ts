import express, { NextFunction, Request, Response } from "express";
import { Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, Patient } from "../types";
import patientService from "../services/patient";
import { NewEntrySchema, NewPatientSchema } from "../utils";
import z from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const patient = patientService.getSinglePatient(id);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({ error: `there is no patient with id of: ${id}` });
    }
});


router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);

});

router.post(
    "/:id/entries",
    newEntryParser,
    (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
        const { id } = req.params;
        const addedEntry = patientService.addEntryToPatient(req.body, id);
        res.json(addedEntry);
    }
);


router.use(errorMiddleware);

export default router;