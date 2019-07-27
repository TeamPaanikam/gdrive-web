const webTorrent = require('webtorrent');
const client = new webTorrent();

exports.addTorrent = (torrentId) => {
    var status = false
    client.add(torrentId, { path: "/tmp/downloads" }, function (addedTorrent) {
        console.log("Torrent added successfully : " + addedTorrent.magnetURI)
        status = true
    })
    return status;
}

exports.torrentState = (torrentId) => {
    var torrent = clients.get(torrentId); 
    return new Promise((resolve, reject) => {
        if(!torrent){
            resolve({
                info : null,
                error : true,
                status : "not found"
            })
        }
        torrent.on("error", () => {
            resolve({
                info : null,
                status : 'error',
                error : true
            })
        })
        torrent.on('metadata', () => {
            resolve({
                info: null,
                status : 'metadata',
                error : false
            })
        })
        torrent.on('ready', () => {
            resolve({
                info : null,
                status : "ready",
                error :false
            })
        })
        torrent.on('done', () => {
            resolve({
                info : fetchInfo(torrentId),
                status : "done",
                error : false
            })
        })
        torrent.on('download', () =>{
            resolve({
                info : fetchInfo(torrentId),
                status : "downloading",
                error : false
            })
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