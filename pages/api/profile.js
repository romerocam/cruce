import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { email, password } = jwt.verify(myTokenName, secret);
  return res.status(200).json({ email, password });
}