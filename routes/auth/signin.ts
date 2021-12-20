import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../../services/middleware";
import { BadRequestError } from "../../services/errors";
import { Password } from "../../services/password";

import { User } from "../../models/user";

const router = express.Router();

router.post(
  "/api/auth/signin",
  [
    body("name").notEmpty().withMessage("You must supply a username"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_KEY!
    );

    // // Store it on session object
    // req.session = {
    //   jwt: userJwt,
    // };

    // req.currentUser = {
    //   id: existingUser.id,
    //   email: existingUser.email,
    //   name: existingUser.name,
    // };

    // res.status(200).send(existingUser);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .send(existingUser);
  }
);

export { router as signinRouter };
