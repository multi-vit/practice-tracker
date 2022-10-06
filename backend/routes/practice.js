import express from "express";
import practices from "../models/index.js";
const router = express.Router();

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

router.get("/", async function (req, res, next) {
  let response = await practices.findOne();
  console.log("Response received from DB");
  console.log(response);
  res.json({ body: response });
});

router.post("/", async function (req, res, next) {
  if (!req.body.date || !req.body.length) {
    res.json({
      message: "Date or length missing, here's what we received",
      body: req.body,
    });
  } else {
    const date = new Date(req.body.date);
    console.log(date);
    if (!dateIsValid(date)) {
      res.json({
        message: "Date invalid, here's what we received",
        body: req.body,
      });
    } else {
      //If length is not a number of is less than 1
      if (isNaN(req.body.length) || req.body.length < 1) {
        res.json({
          message: "Length invalid, here's what we received",
          body: req.body,
        });
      } else {
        //Build the document and add piece details if present
        let document = { date: date, length: Number(req.body.length) };
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
  }
});

export default router;
