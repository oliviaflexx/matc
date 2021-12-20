import express from "express";
import { currentUser } from "../../services/middleware";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/auth/currentuser", currentUser, (req, res) => {

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
