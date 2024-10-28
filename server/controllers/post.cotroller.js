import Post from "../models/post.model.js";

const PostController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const userId = req.user.id; // Use 'id' from the decoded payload

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized action" });
      }

      // Validate request body
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      // Create a new post with user association
      const newPost = await Post.create({
        content,
        user: userId, // Use user ID from the verified token
      });
      const populatedPost = await Post.findById(newPost._id).populate("user");
      return res.status(201).json(populatedPost);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to create post", details: err.message });
    }
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const allPosts = await Post.find()
        .populate("user")
        .sort({ createdAt: -1 });

      return res.status(200).json(allPosts);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve posts", details: err.message });
    }
  },

  // Get a single post by ID
  getOnePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id)
        .populate("user")
        .populate({
          path: "likes",
          model: "user",
          select: "firstName lastName"
        })

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve post", details: err.message });
    }
  },

  // Delete a post by ID
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      //only the user who created the post can delete it
      const userId = req.user.id; // Use 'id' from req.user
      if (post.user.toString() !== userId) {
        return res.status(403).json({ error: "Unauthorized action" });
      }

      await Post.findByIdAndDelete(id);
      return res.status(204).send(); // No content
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to delete post", details: err.message });
    }
  },

  // Update a post by ID
  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      // Validate request body
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      // Find the post to update
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      // only the user who created the post can update it
      const userId = req.user.id; // Use 'id' from req.user
      if (post.user.toString() !== userId) {
        return res.status(403).json({ error: "Unauthorized action" });
      }

      // Update the post content
      post.content = content;
      await post.save();

      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to update post", details: err.message });
    }
  },
};

export default PostController;
