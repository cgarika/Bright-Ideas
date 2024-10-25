import Post from "../models/post.model";


export const PostController = {
    createPost: async (req, res) => {
        try{
            const newPost = await Post.create(req.body)
            console.log(newPost);
            return res.status(201).json(newPost)
        }
        catch(err){

            return res.status(500).json(err)
        }
    },

    getAllPost: async (req, res) => {
        try{
            const allPost = await Post.find()
            return res.status(200).json(allPost)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    getOnePost: async (req, res) => {
        try{
            const id = req.params.id
            const onePost = await Post.findById(id)
            return res.status(200).json(onePost)
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    deletePost: async (req, res) => {
        try{
            const id = req.params.id
            await Post.findByIdAndDelete(id)
            return res.status(204).send()
        }
        catch(err){
            return res.status(500).json(err)
        }
    },

    updatePost: async (req, res) => {
        try{
            const options = {
                new: true,
                runValidators: true}
            const id = req.params.id
            const updatedPost = await Post.findByIdAndUpdate(id, req.body, options)
            return res.status(201).json(updatedPost)
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
}