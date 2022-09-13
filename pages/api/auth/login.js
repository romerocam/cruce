import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import User from "../../../models/User";
import connectMongo from "../../../util/dbConnect";
const bcrypt = require("bcrypt");
const secret = process.env.SECRET;

export default async function loginHandler(req, res) {
  const { email, password } = req.body;
  await connectMongo();

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ error: true, mensaje: "Email not Registered" });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: true, message: "Incorrect Password" });

  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email,
      password,
    },
    secret
  );

  const serialized = serialize("myTokenName", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Login successful",
  });
}
