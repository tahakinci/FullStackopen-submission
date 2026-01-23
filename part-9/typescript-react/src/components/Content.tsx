import type { CoursePart } from "../App"
import Part from "./Part"

type PropTypes = {
    courseParts: CoursePart[]
}

const Content = ({ courseParts }: PropTypes) => {
    return (
        <div>
            {courseParts.map(part => (
                <Part coursePart={part} />
            ))}
        </div>
    )
}

export default Content
