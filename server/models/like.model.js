import {model, Schema} from 'mongoose';

const LikeSchema = new Schema(
    {

        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 

        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } 


    },

    { timestamps: true }
);
const Like = model("like", LikeSchema);
export default Like;