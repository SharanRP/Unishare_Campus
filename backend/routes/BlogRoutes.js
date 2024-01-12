const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');
const { jwtMiddleware } = require('../middlewares/jwt');

router.get('/all', jwtMiddleware, async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
});

router.get('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.status(200).json({ blog });
});

router.post('/', jwtMiddleware, async (req, res) => {
  console.log(req.user);
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: 'All fields are necessary.' });
  }
  console.log(title, body);
  const blog = new Blog({
    title,
    body,
  });
  await blog.save();
  res.status(200).json({ blog, msg: 'Blog created...' });
});

router.delete('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.deleteOne({
    _id: id,
  });

  if (blog.deletedCount === 0) {
    res.status(404).json({ msg: 'Error while deleting blog' });
    return;
  }
  res.status(200).json({ msg: 'Blog deleted...' });
});

router.patch('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, author, body } = req.body;
  const blog = await Blog.findByIdAndUpdate(
    id,
    {
      title,
      author,
      body,
    },
    { new: true },
  );

  res.status(200).json({ blog, msg: 'Blog updated...' });
});

module.exports = router;
