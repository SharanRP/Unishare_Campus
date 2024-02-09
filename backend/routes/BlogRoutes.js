const express = require('express');
const router = express.Router();
const Blog = require('../model/Blog');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/all', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are necessary.' });
    }

    const blog = new Blog({
      title,
      content,
      image: req.file.buffer,
    });

    await blog.save();

    res.status(201).json({ blog, msg: 'Blog created successfully.' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.deleteOne({ _id: id });
    if (blog.deletedCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ msg: 'Blog deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, body },
      { new: true },
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(200).json({ blog, msg: 'Blog updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
