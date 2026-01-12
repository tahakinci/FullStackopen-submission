import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("bloglistLoggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });

      if (user) {
        setUser(user);
        blogService.setToken(user.token);
        window.localStorage.setItem(
          "bloglistLoggedInUser",
          JSON.stringify(user)
        );
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setNotification({
        message: "wrong username or password",
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("bloglistLoggedInUser");
  };

  const handleNewBlog = async (blogObj) => {
    try {
      const newBlog = await blogService.create(blogObj);
      setBlogs([...blogs, newBlog]);
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setNotification({
        message: `invalid blog`,
        type: "error",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = await blogService.update(id, { ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
  }

  const handleRemoveBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.erase(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  return (
    <>
      <Notification notification={notification} />
      {
        user
          ? (
            <div>
              <h2>blogs</h2>
              {user.name} logged in <button onClick={handleLogout}>logout</button>
              <h2>create new</h2>
              <Togglable buttonLabel="create new blog">
                <BlogForm createBlog={handleNewBlog} />
              </Togglable>
              {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemoveBlog={handleRemoveBlog} />
                ))
              }
            </div>
          )
          : (
            <div>
              <h2>log in to application</h2>
              <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
            </div>
          )
      }
    </>
  );
};

export default App;
