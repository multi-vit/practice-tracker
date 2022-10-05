import express from "express";
import practices from "../models/index.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  let response = await practices.findOne();
  console.log("Response received from DB");
  console.log(response);
  res.json({ body: response });
});

router.post("/", async function (req, res, next) {
  if (!req.body.date || !req.body.length) {
    res.json({
      message: "Items missing, here's what we received",
      body: req.body,
    });
  } else {
    //Check if length is number
    if (isNaN(req.body.length) || req.body.length < 1) {
      res.json({
        message: "Length invalid, here's what we received",
        body: req.body,
      });
    } else {
      //Build the document if piece is present
      let document = { date: req.body.date, length: req.body.length };
      if (req.body.practiced) {
        document.practiced = req.body.practiced;
      }
      if (
        (req.body.piece &&
          req.body.piece.title &&
          req.body.piece.title.length > 0) ||
        (req.body.piece &&
          req.body.piece.composer &&
          req.body.piece.composer.length > 0)
      ) {
        //If either title or composer is present, add them or if both, add both
        if (req.body.piece.title) {
          document.piece = { title: req.body.piece.title };
        }
        if (req.body.piece.composer) {
          document.piece = { composer: req.body.piece.composer };
        }
        if (req.body.piece.title && req.body.piece.composer) {
          document.piece = {
            title: req.body.piece.title,
            composer: req.body.piece.composer,
          };
        }
      }
      //Insert the document to the DB
      let response = await practices.insertOne(document);
      console.log("Response received from DB");
      console.log(response);
      //Respond
      res.json({ message: "Response received from DB", body: response });
    }
  }
});

export default router;
