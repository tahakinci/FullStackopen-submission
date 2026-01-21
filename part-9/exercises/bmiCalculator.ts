type BMIResult = "Underweight" | "Normal" | "Overweight" | "Obesity"

const calculateBmi = (heightCm: number, weightKg: number): BMIResult => {
    const heightM = heightCm / 100
    const bmi = weightKg / (heightM * heightM)

    if (bmi < 18.5) {
        return "Underweight"
    }

    if (bmi < 25) {
        return "Normal"
    }

    if (bmi < 30) {
        return "Overweight"
    }

    return "Obesity"
}

console.log(calculateBmi(180, 74)) 