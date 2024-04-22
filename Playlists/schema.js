import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creatorName: { type: String, required: true },
    tracks: { type: Array, required: true}
},
    { collection: "playlists" });
export default playlistSchema;