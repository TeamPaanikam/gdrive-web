const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 3000;

const torrent = require('./util/Torrent');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'pages')));


/* --------------------------   TORRENTS  --------------------------- */

app.post("/fetchTorrentState", (req,res) =>{
    /* We'd make this request from the front end, for every say, 1 second */
    // console.log(req.body);
    var torrentState = torrent.torrentState(req.body.torrentId)      
    console.log(torrentState);
    torrentState.then(() =>{
        res.send(torrentState)
    }, ()=>{
        console.log("Error aa gaya ");
    })
    .catch( () =>{
        console.log("Okay")
    })
    res.json(torrentState);

})

app.post('/addTorrent', (req, res)=> {
    console.log(req.body)
    let status = torrent.addTorrent(req.body.torrentId)
    if(status){
        res.sendStatus(200)
    }
    else {
        res.sendStatus(500)
    }
    /* The response should be suitable, and not only statuses */
})

app.listen(PORT, ()=>{
    console.log("Server listening on port "+ PORT);
})