const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Taha Akıncı',
        url: 'https://example.com/html-is-easy',
        likes: 5
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'Dan Abramov',
        url: 'https://example.com/browser-js',
        likes: 12
    },
    {
        title: 'Node.js and Express basics',
        author: 'Ryan Dahl',
        url: 'https://example.com/node-express',
        likes: 8
    },
    {
        title: 'Full Stack Open notes',
        author: 'University of Helsinki',
        url: 'https://fullstackopen.com',
        likes: 20
    }
]


const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}