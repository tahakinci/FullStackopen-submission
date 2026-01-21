import express from "express";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        res.status(400).json({ error: "height and weight are required" });
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
        res.status(400).json({ error: "height and weight must be numbers" });
    }

    const heightInMeters = heightNum / 100;
    const bmi = weightNum / (heightInMeters * heightInMeters);

    let bmiResult: string;

    if (bmi < 18.5) {
        bmiResult = "Underweight";
    } else if (bmi < 25) {
        bmiResult = "Normal";
    } else if (bmi < 30) {
        bmiResult = "Overweight";
    } else {
        bmiResult = "Obesity";
    }

    res.json({
        height: heightNum,
        weight: weightNum,
        bmi: bmiResult
    });
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || target === undefined) {
        res.status(400).json({ error: "parameters missing" });
    }

    if (
        !Array.isArray(daily_exercises) ||
        isNaN(Number(target))
    ) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    const dailyExercisesNumbers = daily_exercises.map((d: unknown) => Number(d));

    if (dailyExercisesNumbers.some(isNaN)) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    const result = calculateExercises(dailyExercisesNumbers, Number(target));

    res.json(result);
});


const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});