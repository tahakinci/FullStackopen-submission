import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemoveBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [show, setShow] = useState(false)


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {" "}
      <button onClick={() => setShow(prev => !prev)}>{show ? "hide" : "show"}</button>
      {show && (
        <>
          <p>{blog.url}</p>
          <div>
            likes {blog.likes} {" "}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <p>{blog.user.name}</p>
          <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog