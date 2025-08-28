const express = require('express');
const categoryRouter = express.Router();
// const verifyToken = require('../middleware/authMiddleware');

const { testBlogConnection,createBlogCategory, updateBlogCategory, getblogCategories,getblogCategoryById, getBlogCategoryCount, deleteBlogCategory } = require('../controller/blog.category');

categoryRouter.get('/blog/test', testBlogConnection);
categoryRouter.post('/create', createBlogCategory);
categoryRouter.put('/update/:id', updateBlogCategory);
categoryRouter.post('/all-category', getblogCategories);
categoryRouter.post('/all-category/:id', getblogCategoryById);
categoryRouter.get('/category-count', getBlogCategoryCount);
categoryRouter.delete('/delete-category', deleteBlogCategory);


module.exports = categoryRouter;