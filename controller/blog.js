const blogModel = require('../model/dbUtils');
require('dotenv').config();
const LIMIT = parseInt(process.env.LIMIT) || 10;

exports.testBlogConnection = (req, res) => {
  res.status(200).json({ message: 'Connection successful' });
};

exports.createBlog = async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.blog_title) {
      return res.status(400).json({ error: 'Blog title is required' });
    }

    // check duplicate by slug
    const existingBlog = await blogModel.getByField('blogs', 'slugs', formData.slugs);
    if (existingBlog) {
      return res.status(409).json({ error: 'Blog with this slug already exists' });
    }

    const blogData = {
      admin_type: formData.admin_type ?? 0,
      blog_title: formData.blog_title ?? "",
      blog_desc: formData.blog_desc ?? "",
      slugs: formData.slugs ?? "",
      meta_title: formData.meta_title ?? "",
      meta_keywords: formData.meta_keywords ?? "",
      meta_desc: formData.meta_desc ?? "",
      tags: formData.tags ?? "",
      blog_img: formData.blog_img ?? "",
      alt_txt: formData.alt_txt ?? "",
      status: formData.status ?? 1,
      is_deleted: 0,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await blogModel.create('blogs', blogData);

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blogId: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: err.message
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const formData = req.body;
    const blog_id = req.params.id;

    if (!blog_id) {
      return res.status(400).json({ error: 'Blog Id is required' });
    }

    const blogData = {
      admin_type: formData.admin_type ?? 0,
      blog_title: formData.blog_title ?? "",
      blog_desc: formData.blog_desc ?? "",
      slugs: formData.slugs ?? "",
      meta_title: formData.meta_title ?? "",
      meta_keywords: formData.meta_keywords ?? "",
      meta_desc: formData.meta_desc ?? "",
      tags: formData.tags ?? "",
      blog_img: formData.blog_img ?? "",
      alt_txt: formData.alt_txt ?? "",
      status: formData.status ?? 1,
      updated_at: new Date()
    };

    const updatedId = await blogModel.update('blogs', 'blog_id', blog_id, blogData);

    if (!updatedId) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found or not updated'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blogId: updatedId
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: err.message
    });
  }
};


exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || LIMIT;
    const offset = (page - 1) * limit;

    const blogs = await blogModel.getAll('blogs', limit, offset, 'blog_id', 'DESC');

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      data: blogs
    });
  } catch (error) {
    console.error("Error in getBlogs:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog_id = req.params.id;

    if (!blog_id) {
      return res.status(400).json({ error: 'Blog Id is required' });
    }

    const blog = await blogModel.getByField('blogs', 'blog_id', blog_id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog fetched successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog_id = req.params.id;

    if (!blog_id) {
      return res.status(400).json({ error: 'Blog Id is required' });
    }

    // soft delete: set is_deleted + deleted_at
    const deleted = await blogModel.update(
      'blogs',
      'blog_id',
      blog_id,
      { is_deleted: 1, deleted_at: new Date() }
    );

    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found or already deleted' });
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogCount = async (req, res) => {
  try {
    const count = await blogModel.count('blogs');
    res.status(200).json({
      success: true,
      message: 'Blog count fetched successfully',
      count
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
