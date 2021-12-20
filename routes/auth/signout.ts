import express from "express";

const router = express.Router();

router.post("/api/auth/signout", (req, res) => {
  // req.session = null;

  res.clearCookie("access_token").send({});
});

export { router as signoutRouter };
