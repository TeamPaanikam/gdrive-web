const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 3000;

const torrent = require('./util/Torrent');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'pages')));

app.set('views', path.join(__dirname, 'pages'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: __dirname + '/pages/layouts',
    partialsDir: [
        __dirname + '/pages/partials'
    ]
}))





/* --------------------------   TORRENTS  --------------------------- */

app.post("/fetchTorrentState", (req,res) =>{
    /* We'd make this request from the front end, for every say, 1 second */
    var torrentState = torrent.torrentState(req.body.torrentId)      
    res.json(torrentState);            
})

app.post('/addTorrent', (req, res)=> {
    let status = torrent.addTorrent(res.body.torrentId)
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