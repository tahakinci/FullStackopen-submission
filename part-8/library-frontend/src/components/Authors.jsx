import { useQuery } from "@apollo/client/react"
import { ALL_AUTHORS } from "../queries"
import BirthYearForm from "./BirthYearForm"

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS)
  const authors = data?.allAuthors ?? []


  if (loading) {
    return (
      <div>loading ...</div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <BirthYearForm />
    </div>
  )
}

export default Authors
