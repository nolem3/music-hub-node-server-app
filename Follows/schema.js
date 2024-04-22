import mongoose from "mongoose";
const followSchema = new mongoose.Schema({
    follower: { type: String, required: true },
    followed: { type: String, required: true }
},
    { collection: "follows" });
export default followSchema;