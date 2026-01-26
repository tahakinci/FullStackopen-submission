import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api/diaries"

const getDiaries = async () => {
    const res = await axios.get<DiaryEntry[]>(baseUrl);
    return res.data
}

const createDiary = async (data: NewDiaryEntry) => {
    const res = await axios.post<DiaryEntry>(baseUrl, data)
    return res.data
}

export default {
    getDiaries,
    createDiary
}