import { isNotNumber } from "./utils"

interface ExerciseResult {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: 1 | 2 | 3
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (
    dailyHours: number[],
    target: number
): ExerciseResult => {
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(h => h > 0).length

    const total = dailyHours.reduce((a, b) => a + b, 0)
    const average = total / periodLength

    const success = average >= target

    let rating: 1 | 2 | 3
    let ratingDescription: string

    if (average >= target) {
        rating = 3
        ratingDescription = "excellent, target achieved"
    } else if (average >= target * 0.75) {
        rating = 2
        ratingDescription = "not too bad but could be better"
    } else {
        rating = 1
        ratingDescription = "you need to exercise more"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const parseExerciseArguments = (args: string[]): [number, number[]] => {
    if (args.length < 4) {
        throw new Error("Not enough arguments")
    }

    const values = args.slice(2)

    if (values.some(isNotNumber)) {
        throw new Error("Provided values were not numbers")
    }

    const numbers = values.map(Number)
    const target = numbers[0]
    const dailyHours = numbers.slice(1)

    return [target, dailyHours]
}

try {
    const [target, dailyHours] = parseExerciseArguments(process.argv)
    console.log(calculateExercises(dailyHours, target))
} catch (error: unknown) {
    let message = "Something went wrong."
    if (error instanceof Error) {
        message += " " + error.message
    }
    console.log(message)
}
