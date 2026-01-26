import { DiaryEntry } from "../types"

type PropTypes = {
    data: DiaryEntry
}

const Diary = ({ data }: PropTypes) => {
    return (
        <div>
            <h3>{data.date}</h3>
            <p>visibility: {data.visibility}</p>
            <p>weather: {data.weather}</p>
            {data.comment}
        </div>
    )
}
export default Diary
