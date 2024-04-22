import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("PlaylistModel", schema);
export default model;