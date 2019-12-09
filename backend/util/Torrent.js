const webTorrent = require('webtorrent');
const client = new webTorrent();

exports.addTorrent = async (torrentId) => {
    var status = false
    /* TODO : check for duplicate torrent, node process gets killed if a duplicate torrent is passed" */
    await client.add(torrentId, { path: "./downloads" }, function (addedTorrent) {
        console.log("Torrent added successfully : " + addedTorrent.magnetURI)
        status = true
    })
    return status;
}

exports.torrentState =  (torrentId) => {
    // console.log("torrentID - " + torrentId);
    var torrent = client.get(torrentId); 
    console.log("torrent - "+ torrent);
    return new Promise((resolve, reject) => {
        if(!torrent){
            resolve({
                info : null,
                error : true,
                status : "not found"
            })
        }

        torrent.on('error', () => {
            console.log("err");
            resolve({
                info : null,
                status : 'error',
                error : true
            })
        })
        torrent.on('metadata', () => {
            console.log("meta");

            resolve({
                info: null,
                status : 'metadata',
                error : false
            })
        })
        torrent.on('infoHash', () => {
            console.log("infH");

            resolve({
                info: null,
                status : 'metadata',
                error : false
            })
        })
        torrent.on('ready', () => {
            console.log("ready");

            resolve({
                info : null,
                status : "ready",
                error :false
            })
        })
        torrent.on('done', () => {
            console.log("Done");

            resolve({
                info : fetchInfo(torrentId),
                status : "done",
                error : false
            })
        })
        torrent.on('noPeers', () =>{
            console.log("noPEer");

            resolve({
                info: fetchInfo(torrentId), 
                status: "No Peers",
                error: true
            })
        })
        torrent.on('download', () =>{
            console.log("Donwliad");
            console.log(fetchInfo(torrentId))

            resolve({
                info : fetchInfo(torrentId),
                status : "downloading",
                error : false
            })
            
        return;
        })
    })
}

function fetchInfo(torrentId){
    var torrent = client.get(torrentId);
    if (torrent) {
        let fileArr = [], i = 0;
        for (file in torrent.files) {
            fileArr[i] = {
                'name': file.name,
                'size': file.size,
                'progress': file.progress * 100
            }
            i++;
        }
        var torrentStatus = {
            'files': fileArr,
            'progress': torrent.progress,
            'downloadSpeed': torrent.downloadSpeed,
            'peers': torrent.numPeers,
            'ratio': torrent.ratio,
            'time': torrent.timeRemaining
        }
        return torrentStatus
    }
    return null;
}