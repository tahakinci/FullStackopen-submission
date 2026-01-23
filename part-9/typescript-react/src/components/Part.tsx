import type { CoursePart } from "../App"

type PropTypes = {
    coursePart: CoursePart
}

const Part = ({ coursePart }: PropTypes) => {
    switch (coursePart.kind) {
        case "background":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <p>{coursePart.description}</p>
                    <p>submit to {coursePart.backgroundMaterial}</p>
                </div>
            )
        case "basic":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <p>{coursePart.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                    <p>project exercises {coursePart.groupProjectCount}</p>
                </div>
            )
        default:
            break;
    }
}

export default Part