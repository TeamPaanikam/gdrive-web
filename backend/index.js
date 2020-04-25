const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8000;
const util = require("util");

const torrent = require("./util/Torrent");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "pages")));

/* --------------------------   TORRENTS  --------------------------- */

app.post("/fetchTorrentState", async (req, res) => {
  /* We'd make this request from the front end, for every say, 1 second */
  console.log(req.body);
  var torrentState = await torrent.torrentState(req.body.torrentId);
  console.log("from index.js");
  console.log(util.inspect(torrentState, false, null, true));
  res.json(torrentState);
});

app.post("/addTorrent", (req, res) => {
  console.log(req.body);
  if (req.body.torrentId !== undefined) {
    let status = torrent.addTorrent(req.body.torrentId);
    if (status) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } else res.sendStatus(500);
  /* The response should be suitable, and not only statuses */
});
app.post("/toDrive", (req, res) =>{
  console.log(req.body);
  let status = torrent.uploadToDrive(req.body.torrentId);
  // console.log(status);
  res.sendStatus(202);
});


app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
