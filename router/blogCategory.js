const express = require('express');
const categoryRouter = express.Router();
// const verifyToken = require('../middleware/authMiddleware');

const { testBlogConnection } = require('../controller/blog.category');

categoryRouter.get('/blog/test', testBlogConnection);


module.exports = categoryRouter;