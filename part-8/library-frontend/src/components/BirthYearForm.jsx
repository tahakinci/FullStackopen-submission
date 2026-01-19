import { useMutation, useQuery } from "@apollo/client/react"
import { useState } from "react"
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries"

const BirthYearForm = () => {
    const [name, setName] = useState("")
    const [birthYear, setBirthYear] = useState("")

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        updateQueries: [{ query: ALL_BOOKS }]
    })

    const { data, loading } = useQuery(ALL_AUTHORS)
    const authors = data?.allAuthors ?? []

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        editAuthor({ variables: { name, born: Number(birthYear) } })

        setName("")
        setBirthYear("")
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                name:
                <select disabled={loading} value={name} onChange={({ target }) => setName(target.value)}>
                    <option value="" disabled>Select author</option>
                    {
                        authors.map(author => (
                            <option value={author.name} key={`authorOption-${author.id}`}>{author.name}</option>
                        ))
                    }

                </select>
            </div>
            <div>
                born:
                <input value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
            </div>
            <button type="submit">update author</button>
        </form>
    )
}
export default BirthYearForm
