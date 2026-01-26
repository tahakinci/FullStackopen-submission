import { useEffect, useState } from "react"
import diaryService from "../services/diary";
import { DiaryEntry } from "../types";
import React from "react";
import Diary from "./Diary";

const Diaries = () => {
    const [diaryData, setDiaryData] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiatryData = async () => {
            const data = await diaryService.getDiaries()
            if (data) {
                setDiaryData(data)
            }
        }

        fetchDiatryData()
    }, [])

    return (
        <div>
            <h2>Diary entries</h2>
            {
                diaryData.map(diary => (
                    <React.Fragment key={diary.id}>
                        <Diary data={diary} />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default Diaries
