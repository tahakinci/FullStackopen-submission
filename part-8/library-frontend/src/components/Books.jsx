import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS)
  const books = data?.allBooks ?? []

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
