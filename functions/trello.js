const express = require("express");
const router = express.Router();
require("dotenv").config();

const apiKey = process.env.TRELLO_API_KEY;
const oauthToken = process.env.TRELLO_OAUTH_TOKEN;

const trello = require("trello-node-api")(apiKey, oauthToken);

router.get("/:id", async (req, res) => {
  const boardId = req.params.id;

  try {
    const data = await trello.board.searchCards(boardId);
    res.json({ response: data });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
