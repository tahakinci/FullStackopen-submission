const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  res.json(blogs);
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;
    if (!user) return res.status(401).json({ error: "invalid token" });

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

blogRouter.delete("/", async (req, res, next) => {
  const { id } = req.params;
  await Blog.findOneAndDelete(id);

  res.status(204).end();
});

blogRouter.put("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;

    const updateBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
    };

    await Blog.findByIdAndUpdate(id);
    res.status(201).json(updateBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
  }
});
blogRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "invalid token" });

    await Blog.findOneAndDelete(req.params.id);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
