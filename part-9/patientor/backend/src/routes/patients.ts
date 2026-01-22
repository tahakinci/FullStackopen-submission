import express, { Response } from "express";
import { NonSensitivePatientEntry } from "../types";
import patientService from "../services/patient";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatients());
});

router.post("/", (_req, res) => {
    res.send("Saving a diary");
});

export default router;