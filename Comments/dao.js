import model from "./model.js";

export const createComment = (comment) => model.create(comment);
export const findAllComments = () => model.find();
export const findAllTrackComments = () => model.find({ isTrack: true });
export const findAllPlaylistComments = () => model.find({ isTrack: false });
export const findCommentsByItem = (itemId) => model.find({ itemCommentedOn: itemId });
export const findCommentsByTrack = (trackId) => model.find({ itemCommentedOn: trackId, isTrack: true });
export const findCommentsByPlaylist = (playlistId) => model.find({ itemCommentedOn: playlistId, isTrack: false });
export const deleteComment = (id) => model.deleteOne({ _id: id });