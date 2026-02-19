import React, { Dispatch, SetStateAction, useState } from "react"
import diaryService from "../services/diary"
import axios from "axios"
import { Visibility, Weather } from "../types"

type PropTypes = {
    setNotification: Dispatch<SetStateAction<string>>
}

const DiaryForm = ({ setNotification }: PropTypes) => {
    const [date, setDate] = useState("")
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await diaryService.createDiary({
                date: date,
                visibility: visibility,
                weather: weather,
                comment: comment
            })
            console.log(res)
            if (res) {
                setDate("")
                setVisibility(Visibility.Great)
                setWeather(Weather.Sunny)
                setComment("")
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error.response)
                setNotification(error.response?.data)
                setTimeout(() => {
                    setNotification("")
                }, 3000)
            }
            else {
                console.log(error)
            }
        }

    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                date
                <input value={date} onChange={({ target }) => setDate(target.value)} />
            </div>
            <div>
                visibility
                <div style={{ display: "flex", gap: "12px" }}>
                    {Object.values(Visibility).map(v => (
                        <label key={v.toString()} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <input
                                type="radio"
                                name="visibility"
                                value={v}
                                onChange={() => setVisibility(v)}
                                checked={visibility === v}
                            />
                            {v.toString()}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                weather
                <div style={{ display: "flex", gap: "12px" }}>
                    {Object.values(Weather).map(w => (
                        <label key={w.toString()} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <input
                                type="radio"
                                name="weather"
                                value={w}
                                onChange={() => setWeather(w)}
                                checked={weather === w}
                            />
                            {w.toString()}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                comment
                <input value={comment} onChange={({ target }) => setComment(target.value)} />
            </div>
            <button type="submit">add</button>

        </form>
    )
}

export default DiaryForm
