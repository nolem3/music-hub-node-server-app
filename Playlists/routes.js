import * as dao from "./dao.js";

export default function PlaylistRoutes(app) {
    const PLAYLISTS_API = "/api/playlists";

    const createPlaylist = async (req, res) => {
        const playlist = await dao.createPlaylist(req.body);
        res.json(playlist);
    };
    const findAllPlaylists = async (req, res) => {
        const playlists = await dao.findAllPlaylists();
        res.json(playlists);
    };
    const findPlaylistsByCreator = async (req, res) => {
        const playlists = await dao.findPlaylistsByCreator(req.params.creator);
        res.json(playlists);
    };
    const findPlaylistById = async (req, res) => {
        const playlist = await dao.findPlaylistById(req.params.id);
        res.json(playlist);
    }
    const updatePlaylist = async (req, res) => {
        const status = await dao.updatePlaylist(req.params.id, req.body);
        res.json(status);
    };
    const appendTrackToPlaylist = async (req, res) => {
        // console.log(req.params.id)
        const playlist = await dao.findPlaylistById(req.params.id);
        if (playlist._doc.tracks.includes(req.body.trackId)) {
            console.log("User attempted to append a duplicate track to their playlist");
            res.sendStatus(202);
            return;
        }
        const status = await dao.updatePlaylist(req.params.id, {...playlist._doc, tracks: [...playlist.tracks, req.body.trackId]});
        res.json(status);
    }
    const deletePlaylist = async (req, res) => {
        const status = await dao.deletePlaylist(req.params.id);
        res.json(status);
    }

    app.post(`${PLAYLISTS_API}`, createPlaylist);
    app.get(`${PLAYLISTS_API}`, findAllPlaylists);
    app.get(`${PLAYLISTS_API}/:creator`, findPlaylistsByCreator);
    app.get(`${PLAYLISTS_API}/id/:id`, findPlaylistById);
    app.put(`${PLAYLISTS_API}/:id`, updatePlaylist);
    app.put(`${PLAYLISTS_API}/append/:id`, appendTrackToPlaylist);
    app.delete(`${PLAYLISTS_API}/:id`, deletePlaylist);
}