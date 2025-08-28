const blogCategoryModel = require('../model/dbUtils');
require('dotenv').config();
const LIMIT = parseInt(process.env.LIMIT) || 10;
exports.testBlogConnection = (req, res) => {
    res.status(200).json({ message: 'Connection successful' });
};

exports.createBlogCategory = async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.cat_name) {
            return res.status(400).json({ error: 'Category name is required' });
        }       
        const existingCategory = await blogCategoryModel.getByField('categories','cat_name', formData.cat_name);
        if (existingCategory) {
            return res.status(409).json({ error: 'Category already exists' });
        }
        const categoryData = {
            admin_type: formData.admin_type ?? 0,
            cat_name: formData.cat_name ?? "",
            cat_slugs: formData.cat_slugs ?? "",
            meta_title: formData.meta_title ?? "",
            meta_desc: formData.meta_desc ?? "",
            meta_keys: formData.meta_keys ?? "",
            tags: formData.tags ?? "",
            status: formData.status ?? 1
        };
         const result = await blogCategoryModel.create('categories',categoryData);

        return res.status(201).json({
            success: true,
            message: 'Blog category created successfully',
            categoryId: result
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: err.message
        });
    }
};

exports.updateBlogCategory = async (req, res) => {
  try {
    const formData = req.body;
    const cat_id = req.params.id;

    if (!cat_id) {
      return res.status(400).json({ error: 'Category Id is required' });
    }

    const categoryData = {
      admin_type: formData.admin_type ?? 0,
      cat_name: formData.cat_name ?? "",
      cat_slugs: formData.cat_slugs ?? "",
      meta_title: formData.meta_title ?? "",
      meta_desc: formData.meta_desc ?? "",
      meta_keys: formData.meta_keys ?? "",
      tags: formData.tags ?? "",
      status: formData.status ?? 1
    };

    const updatedId = await blogCategoryModel.update('categories', 'Id', cat_id, categoryData);

    if (!updatedId) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or not updated'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog category updated successfully',
      categoryId: updatedId
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: err.message
    });
  }
};

exports.getblogCategories = async (req, res) => {
    try {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || LIMIT;
        const offset = (page - 1) * limit;
        console.log(limit, page, offset);
        const categories = await blogCategoryModel.getAll('categories', limit, offset);
        console.log(categories);
        res.status(200).json({success: true, message: 'Blog categories fetched successfully', data: categories });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getblogCategoryById = async (req, res) => {
    try {
        const cat_id = req.params.id;
        if (!cat_id) {
            return res.status(400).json({ error: 'Category Id is required' });
        }
        const category = await blogCategoryModel.getByField('categories', 'Id' ,cat_id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Blog category fetched successfully', data: category });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.deleteBlogCategory = async (req, res) => {
    try {
        const cat_id = req.params.id;
        if (!cat_id) {
            return res.status(400).json({ error: 'Category Id is required' });
        }
        const deleted = await blogCategoryModel.remove('categories', 'Id', cat_id);
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found or already deleted' });
        }
        res.status(200).json({ success: true, message: 'Blog category deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getBlogCategoryCount = async (req, res) => {
    try {
        const count = await blogCategoryModel.count('categories');
        res.status(200).json({ success: true, message: 'Blog category count fetched successfully', count });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}