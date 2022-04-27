import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.send({ message: "oi" });
});

export { router as authentication_twitter };
