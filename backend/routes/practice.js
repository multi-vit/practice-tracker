import express from "express";
import practices from "../models/index.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  let response = await practices.findOne();
  console.log("Response received from DB");
  console.log(response);
  res.json({ body: response });
});

router.post("/", function (req, res, next) {
  res.json({ message: "Here's what we received", body: req.body });
});

export default router;
