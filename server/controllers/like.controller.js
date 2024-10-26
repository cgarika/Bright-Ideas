import Like from "../models/like.model.js";


export const LikeController = {
    createLike: async (req, res) => {
        try{
            const newLike = await Like.create(req.body)
            console.log(newLike);
            return res.status(201).json(newLike)
        }
        catch(err){

            return res.status(500).json(err)
        }
    },
}