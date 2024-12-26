import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyToken(token: any) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
