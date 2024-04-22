import * as dao from "./dao.js";

export default function FollowRoutes(app) {
    const FOLLOWS_API = "/api/follows"

    const createFollow = async (req, res) => {
        const maybeFollow = await dao.findFollowByPair(req.body.follower, req.body.followed);
        if (maybeFollow) {
            res.status(400).json(
                { message: "Follow already exists" });
            return;
        }
        const follow = await dao.createFollow(req.body);
        res.json(follow);
    };
    const deleteFollow = async (req, res) => {
        const status = await dao.deleteFollow(req.params.id);
        res.json(status);
    };
    const deleteFollowByPair = async (req, res) => {
        const status = await dao.deleteFollowByPair(req.params.follower, req.params.followed);
        res.json(status);
    }
    const findFollowsByFollower = async (req, res) => {
        const follows = await dao.findFollowsByFollower(req.params.follower);
        res.json(follows);
    };
    const findFollowsByFollowed = async (req, res) => {
        //console.log(req.params.followed);
        const follows = await dao.findFollowsByFollowed(req.params.followed);
        //console.log(follows);
        res.json(follows);
    };

    app.post(`${FOLLOWS_API}`, createFollow);
    app.delete(`${FOLLOWS_API}/:id`, deleteFollow);
    app.delete(`${FOLLOWS_API}/:follower/:followed`, deleteFollowByPair);
    app.get(`${FOLLOWS_API}/follower/:follower`, findFollowsByFollower);
    app.get(`${FOLLOWS_API}/followed/:followed`, findFollowsByFollowed);
}