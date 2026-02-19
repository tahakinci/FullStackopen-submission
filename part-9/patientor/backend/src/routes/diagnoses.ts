import express, { Response } from "express";
import { Diagnosis } from "../types";
import diagnoseService from "../services/diagnose";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
    res.json(diagnoseService.getDiagnoses());
});

router.post("/", (_req, res) => {
    res.send("Saving a diary");
});

export default router;