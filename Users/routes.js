import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.username);
        res.json(status);
    };
    const updateUser = async (req, res) => {
        const status = await dao.updateUser(req.params.username, req.body);
        req.session["currentUser"] = req.body;
        res.json(status);
    };
    const findUser = async (req, res) => {
        const user = await dao.findUserByUsername(req.params.username);
        res.json(user);
    };
    const login = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
        else {
            res.sendStatus(401);
        }
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
        }
        else {
            const currentUser = await dao.createUser(req.body);
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
    };
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };
    app.post("/api/users", createUser);
    app.delete("/api/users/:username", deleteUser);
    app.put("/api/users/:username", updateUser);
    app.get("/api/users/:username", findUser);
    app.post("/api/users/login", login);
    app.post("/api/users/signup", signup);
    app.post("/api/users/logout", logout);
    app.post("/api/users/profile", profile);
}