const assert = require("node:assert")
const { test, after, beforeEach } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test("all blogs are returned", async () => {
    const res = await api.get("/api/blogs")

    assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('the unique identifier of a blog post is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blog = blogsAtStart[0]

    assert(blog.id)
    assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Taha Akıncı',
        url: 'https://example.com/async-await',
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes('async/await simplifies making async calls'))
})

test('without likes property, added blog gets likes value as 0 ', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Taha Akıncı',
        url: 'https://example.com/async-await',
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(addedBlog.body.likes, 0)

})

test('request without required fields return code:400 ', async () => {
    const newBlog = {
        author: 'Taha Akıncı',
        url: 'https://example.com/async-await',
        likes: 2
    }

    const addedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(
        blogsAtEnd.length,
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
})

test('a blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.author,
        likes: blogToUpdate.likes + 5
    }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 5)
})

after(async () => {
    await mongoose.connection.close()
})
