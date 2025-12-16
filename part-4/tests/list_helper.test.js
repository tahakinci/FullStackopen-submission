const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})
describe("total likes", () => {
    test('of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{ title: "test-1", author: "test_author-1", url: "test_url.com", likes: 5 }]

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const blogs =
            [
                { title: "test-1", author: "test_author-1", url: "test_url1.com", likes: 5 },
                { title: "test-2", author: "test_author-2", url: "test_url2.com", likes: 2 },
                { title: "test-3", author: "test_author-3", url: "test_url3.com", likes: 6 },
                { title: "test-4", author: "test_author-4", url: "test_url4.com", likes: 3 }
            ]

        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 16)
    })
})

describe("favorite blog", () => {
    test('when list has empty equals null', () => {
        const blogs = []

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog equals the object of that', () => {
        const blogs = [{ title: "test-1", author: "test_author-1", url: "test_url.com", likes: 5 }]

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[0])
    })

    test('of a bigger list is calculated right', () => {
        const blogs =
            [
                { title: "test-1", author: "test_author-1", url: "test_url1.com", likes: 5 },
                { title: "test-2", author: "test_author-2", url: "test_url2.com", likes: 2 },
                { title: "test-3", author: "test_author-3", url: "test_url3.com", likes: 6 },
                { title: "test-4", author: "test_author-4", url: "test_url4.com", likes: 3 }
            ]

        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe("Blogger with most blog", () => {
    test('when list has only one blog equals the object of that', () => {
        const blogs = [{ author: "test_author-1", blogs: 5 }]

        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, "test_author-1 has 5 blogs")
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [{ author: "test_author-1", blogs: 5 }, { author: "test_author-2", blogs: 2 }, { author: "test_author-3", blogs: 15 }, { author: "test_author-4", blogs: 7 }]

        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, "test_author-3 has 15 blogs")
    })
})

describe("Blogger with most likes", () => {
    test('when list has only one blog equals the object of that', () => {
        const blogs = [{ author: "test_author-1", likes: 5 }]

        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, "test_author-1 has 5 likes")
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [{ author: "test_author-1", likes: 5 }, { author: "test_author-2", likes: 2 }, { author: "test_author-3", likes: 15 }, { author: "test_author-4", likes: 7 }]

        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, "test_author-3 has 15 likes")
    })
})
