const Book = require("./models/book")
const Author = require("./models/author");
const User = require("./models/user")
const { GraphQLError } = require("graphql")
const { PubSub } = require('graphql-subscriptions')
const jwt = require("jsonwebtoken")

const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filteredBooks = await Book.find({}).populate("author")
            console.log("Book.find")

            if (args.author) {
                filteredBooks = filteredBooks.filter(book => book.author === args.author)
            }

            if (args.genre) {
                filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
            }
            return filteredBooks
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            console.log("Author.Find")
            return authors
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async ({ name }) => {
            const author = await Author.findOne({ name })


            if (!author) {
                return 0
            }

            const count = await Book.countDocuments({ author: author._id })
            return count
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "UNAUTHENTICATED"
                    }
                })
            }

            const hasAuthor = await Author.exists({ name: args.author })
            const titleExists = await Book.exists({ title: args.title })

            if (titleExists) {
                throw new GraphQLError(`Title must be unique: ${args.title}`, {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title
                    }
                })
            }

            if (!hasAuthor) {
                const author = new Author({
                    name: args.author,
                    born: null,
                    bookCount: 1

                })
                await author.save()

                const book = new Book({ ...args, author: author._id })
                return book.save()
            }

            const book = new Book({ ...args, author: hasAuthor._id })
            pubsub.publish("BOOK_ADDED", { bookAdded: book })
            return book.save()

        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "UNAUTHENTICATED"
                    }
                })
            }

            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo
            return author.save()
        },
        createUser: async (root, args) => {
            try {
                const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

                return user.save()

            } catch (error) {
                throw new GraphQLError(`Creating the user failed: ${error.message}`, {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.username,
                        error
                    }
                })
            }
        },
        login: async (root, args) => {
            try {
                const user = await User.findOne({ username: args.username })

                if (!user || args.password !== "secret") {
                    throw new GraphQLError("Wrong credentials", {
                        extensions: {
                            code: "BAD_USER_INPUT"
                        }
                    })
                }

                const userForToken = {
                    username: user.username,
                    id: user._id,
                }

                return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
            } catch (error) {
                throw new GraphQLError(`login failed: ${error.message}`, {
                    extensions: {
                        code: "USER_BAD_INPUT",
                        error
                    }
                })
            }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers