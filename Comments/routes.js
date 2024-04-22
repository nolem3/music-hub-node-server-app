import * as dao from "./dao.js";

export default function CommentRoutes(app) {
    const COMMENTS_API = "/api/comments";
    const createComment = async (req, res) => {
        const comment = await dao.createComment(req.body);
        res.json(comment);
    }
    const findCommentsByTrack = async (req, res) => {
        const comments = await dao.findCommentsByTrack(req.params.id);
        res.json(comments);
    }
    const findCommentsByPlaylist = async (req, res) => {
        const comments = await dao.findCommentsByPlaylist(req.params.id);
        res.json(comments);
    }
    const deletePlaylist = async (req, res) => {
        const status = await dao.deleteComment(req.params.id);
        res.json(status);
    }
    app.post(`${COMMENTS_API}`, createComment);
    app.get(`${COMMENTS_API}/tracks/:id`, findCommentsByTrack);
    app.get(`${COMMENTS_API}/playlists/:id`, findCommentsByPlaylist);
    app.delete(`${COMMENTS_API}/:id`, deletePlaylist);
}