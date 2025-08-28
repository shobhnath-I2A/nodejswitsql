const express = require('express');
const blogRouter = express.Router();

const { 
  testBlogConnection,
  createBlog, 
  updateBlog, 
  getBlogs,
  getBlogById, 
  getBlogCount, 
  deleteBlog 
} = require('../controller/blog');

blogRouter.get('/blogs/test', testBlogConnection);
blogRouter.post('/blogs', createBlog);
blogRouter.put('/blogs/:id', updateBlog);
blogRouter.get('/blogs', getBlogs);
blogRouter.get('/blogs/:id', getBlogById);
blogRouter.get('/blogs-count', getBlogCount);
blogRouter.delete('/blogs/:id', deleteBlog);

module.exports = blogRouter;
