import { useState } from "react"

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleNewBlog = (e) => {
        e.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle("");
        setAuthor("");
        setUrl("");
    }

    return (
        <form onSubmit={handleNewBlog}>
            <div>
                title
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                author
                <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                url
                <input value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm
