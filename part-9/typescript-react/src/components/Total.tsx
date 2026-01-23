type PropTypes = {
    totalExercises: number
}

const Total = ({ totalExercises }: PropTypes) => (
    <p>Number of exercises {totalExercises}</p>
)

export default Total
