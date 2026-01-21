import { ALL_BOOKS } from "../queries"

export const addBookToCache = (cache, personToAdd) => {
    cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        const bookExists = allBooks.some(
            (book) => book.id === personToAdd.id,
        )

        if (bookExists) {
            return { allBooks }
        }

        return {
            allBooks: allBooks.concat(personToAdd)
        }
    })
}