import express from 'express';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Helper to generate URL-safe slugs
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// 1. PUBLIC: GET ALL PUBLISHED BLOGS
router.get('/', async (req, res) => {
  try {
    const { search, tag } = req.query;
    const query = { status: 'PUBLISHED' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
});

// 2. ADMIN: GET ALL BLOGS (INCLUDING DRAFTS)
router.get('/admin/all', protect, async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (error) {
    console.error('Error fetching admin blogs:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin blogs' });
  }
});

// 3. ADMIN: CREATE NEW BLOG
router.post('/admin/create', protect, async (req, res) => {
  try {
    const { title, coverImage, excerpt, content, tags, author, readTime, status } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ success: false, message: 'Title, excerpt and content are required fields' });
    }

    let generatedSlug = slugify(title);
    const existing = await Blog.findOne({ slug: generatedSlug });
    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = new Blog({
      title,
      slug: generatedSlug,
      coverImage: coverImage || '/images/hero-lovepartners-banner.jpg',
      excerpt,
      content,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : ['Jaipur Escorts'],
      author: author || 'LovePartners Editorial',
      readTime: readTime || '5 min read',
      status: status || 'PUBLISHED',
    });

    await newBlog.save();
    return res.status(201).json({ success: true, message: 'Blog post created successfully!', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to create blog post' });
  }
});

// 4. ADMIN: UPDATE EXISTING BLOG
router.put('/admin/update/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage, excerpt, content, tags, author, readTime, status } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    if (title && title !== blog.title) {
      blog.title = title;
      blog.slug = slugify(title);
    }

    if (coverImage) blog.coverImage = coverImage;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (author) blog.author = author;
    if (readTime) blog.readTime = readTime;
    if (status) blog.status = status;
    if (tags) {
      blog.tags = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : blog.tags;
    }

    await blog.save();
    return res.json({ success: true, message: 'Blog post updated successfully!', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({ success: false, message: 'Failed to update blog post' });
  }
});

// 5. ADMIN: DELETE BLOG
router.delete('/admin/delete/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    return res.json({ success: true, message: 'Blog post deleted successfully!' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete blog post' });
  }
});

// 6. PUBLIC: GET SINGLE BLOG BY SLUG OR ID (Wildcard - must be after /admin routes)
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let blog = await Blog.findOne({
      $or: [{ slug: identifier }, { _id: mongoose.isValidObjectId(identifier) ? identifier : null }],
    });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found' });
    }

    // Increment view counter asynchronously
    blog.views = (blog.views || 0) + 1;
    await blog.save();

    // Fetch related articles (same tags or recent)
    const relatedBlogs = await Blog.find({
      _id: { $ne: blog._id },
      status: 'PUBLISHED',
    })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.json({ success: true, blog, relatedBlogs });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blog post' });
  }
});

export default router;
