import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState("all")
  const books = data?.allBooks ?? []

  const genreItems = [
    ...new Set(books.flatMap(book => book.genres))
  ]

  const filteredBooks = filter === "all" ? books : books.filter(book => book.genres.includes(filter))


  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <p>{filter !== "all" ? <b>{`in genre ${filter}`}</b> : ""}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setFilter("all")}>all</button>
      {
        genreItems.map(item => (
          <button key={item} onClick={() => setFilter(item)}>{item}s</button>
        ))
      }
    </div>
  )
}

export default Books
