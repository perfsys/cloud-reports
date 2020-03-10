const express = require("express");
const router = express.Router();
// require("dotenv").config();

const apiKey = process.env.TRELLO_API_KEY;
const oauthToken = process.env.TRELLO_OAUTH_TOKEN;

const trello = require("trello-node-api")(apiKey, oauthToken);

router.get("/", async (req, res) => {
  const {id} = req.query;
  console.log(apiKey)
  console.log(oauthToken)
  console.log(id)
  try {
    const data = await trello.board.searchCards(id);
    res.json({ response: data });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
