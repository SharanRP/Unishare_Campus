const express = require('express');
const app = express();
const BlogRoutes = require('./routes/BlogRoutes');
const UserRoutes = require('./routes/UserRoutes');
const { mongoose } = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/blogsDB');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use('/api/blogs', BlogRoutes);
app.use('/api/user', UserRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on Server ${process.env.PORT}`);
});
