// Express Security & Extras (write in TypeScript types)   3 min · 6 marks
// ●	verifyJwt(req: Request, res: Response, next: NextFunction): read the Bearer token, verify with jsonwebtoken, attach req.user, else 401.
// ●	requireRole("admin") middleware factory → 403 if req.user.role doesn't match (RBAC).
// ●	Email: sendConfirmation(to, roomName) using nodemailer (createTransport + sendMail) with a "Hotel confirmation" subject and a short HTML body.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

// RBAC
export function requireRole(role: string) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== role) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    next();
  };
}
// router file
router.get("/admin", verifyJwt, requireRole("admin"), controller);

// Nodemailer
import nodemailer from "nodemailer";

async function sendConfirmation(
  to: string,
  roomName: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Hotel confirmation",
    html: `
      <h2>Hotel Confirmation</h2>
      <p>Your room ${roomName} has been confirmed.</p>
    `,
  });
}