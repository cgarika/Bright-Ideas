import Like from "../models/like.model.js";
import Post from "../models/post.model.js";


export const LikeController = {
    createLike: async (req, res) => {
        const { userId, postId } = req.body
        if (!userId || !postId) {
            return res.status(400).json({ msg: 'User ID and Post ID are required!! '})
        }

        try{
            const existingLike = await Like.findOne({ user: userId, post: postId })
            if (existingLike) {
                return res.status(400).json({ msg: 'You have already liked this post' })
            }
            const newLike = await Like.create({ user: userId, post: postId })
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } })
            console.log(newLike);
            return res.status(201).json(newLike)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
}