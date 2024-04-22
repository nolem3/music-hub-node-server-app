import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    commenter: { type: String, required: true },
    itemCommentedOn: { type: String, required: true },
    isTrack: { type: Boolean, required: true },
    message: { type: String, required: true }
},
    { collection: "comments" });
export default commentSchema;