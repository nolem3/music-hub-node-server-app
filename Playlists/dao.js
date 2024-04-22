import model from "./model.js";
export const createPlaylist = (playlist) => model.create(playlist);
export const findAllPlaylists = () => model.find();
export const findPlaylistsByCreator = (creator) => model.find({creatorName: creator})
export const findPlaylistById = (id) => model.findOne({_id: id})
export const updatePlaylist = (id, playlist) => model.updateOne({ _id: id }, { $set: playlist });
export const deletePlaylist = (id) => model.deleteOne({ _id: id });