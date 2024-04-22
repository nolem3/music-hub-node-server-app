import express from 'express';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from './Users/routes.js';
import FollowRoutes from './Follows/routes.js';
import PlaylistRoutes from './Playlists/routes.js';
import CommentRoutes from './Comments/routes.js';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

const app = express()
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.FRONTEND_URL]
}));
app.use(express.json());

UserRoutes(app);
FollowRoutes(app);
PlaylistRoutes(app);
CommentRoutes(app);

app.listen(process.env.PORT || 4000)