import express from "express";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});