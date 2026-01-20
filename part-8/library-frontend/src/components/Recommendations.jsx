import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, GET_USER } from "../queries"

const Recommendations = () => {
    const {
        data: userData,
        loading: userLoading,
    } = useQuery(GET_USER)

    const favoriteGenre = userData?.me?.favoriteGenre

    const {
        data: bookData,
        loading: bookLoading,
    } = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre,
    })

    if (userLoading || bookLoading) {
        return <div>loading...</div>
    }

    const books = bookData?.allBooks ?? []

    return (
        <div>
            <h2>recommendations</h2>
            <p>
                books in your favorite genre <b>{favoriteGenre}</b>
            </p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>

                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author.name}</td>
                            <td>{book.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations
