import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setBlogs([...blogs, newBlog]);
      setTitle("");
      setAuthor("");
      setUrl("");
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        password
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <>
      <Notification notification={notification} />
      {user ? blogForm() : loginForm()}
    </>
  );
};

export default App;
