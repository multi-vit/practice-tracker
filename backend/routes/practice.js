import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️" });
});

router.post("/", function (req, res, next) {
  res.json({ message: "Here's what we received", body: req.body });
});

export default router;
