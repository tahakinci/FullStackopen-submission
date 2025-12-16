const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((acc, curr) => acc + curr.likes, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return null

    const favoriteBlog = blogs.reduce((acc, curr) => {
        if (acc.likes < curr.likes)
            return curr
        return acc
    }, blogs[0])
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return null

    const mostBlogWriter = blogs.reduce((acc, curr) => {
        if (acc.blogs < curr.blogs)
            return curr
        return acc
    }, blogs[0])
    return `${mostBlogWriter.author} has ${mostBlogWriter.blogs} blogs`
}

const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return null

    const authorWithMostLikes = blogs.reduce((acc, curr) => {
        if (acc.likes < curr.likes)
            return curr
        return acc
    }, blogs[0])
    return `${authorWithMostLikes.author} has ${authorWithMostLikes.likes} likes`
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}