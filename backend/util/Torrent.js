const webTorrent = require("webtorrent");
const client = new webTorrent();
const Gdrive = require('./GDrive');


exports.addTorrent = async torrentId => {
  var status = false;
  /* TODO : check for duplicate torrent, node process gets killed if a duplicate torrent is passed" */
  var torr = client.get(torrentId);
  if (torr) {
    console.log("Duplicate torrent ");
    status = false;
  } else {
    await client.add(torrentId, { path: "./downloads" }, function(
      addedTorrent
    ) {
      console.log("Torrent added successfully : " + addedTorrent.magnetURI);
      status = true;
    });
  }
  return status;
};
exports.torrentState = torrentId => {
  var torrent = client.get(torrentId);
  return new Promise((resolve, reject) => {
    if (!torrent) {
      resolve({
        info: null,
        error: true,
        status: "not found"
      });
    }
    if (torrent.ready) {
      if (torrent.downloadSpeed > 0) {
        resolve({
          info: fetchInfo(torrentId),
          status: "Downloading",
          error: false
        });
      } else if (torrent.done) {
        resolve({
          info: fetchInfo(torrentId),
          status: "Downloaded",
          error: false
        });
      } else if (torrent.numPeers == 0) {
        resolve({
          info: fetchInfo(torrentId),
          status: "No Peers",
          error: true
        });
      } else
        resolve({
          info: fetchInfo(torrentId),
          status: "Ready",
          error: false
        });
    } else {
      resolve({
        info: null,
        status: "!Ready",
        error: false
      });
    }
  });
};

exports.uploadToDrive = torrentID => {
  var torrent = client.get(torrentID);
  if(!torrent){
    console.log("Torrent does not exist");
    return 404;
  }
  else{
    while(!torrent.done){
      console.log("Still downloading");
    }

    if(torrent.done){
      // torrent is done downloading, needs to be uploaded to the drive and removed from the client altogether.
      /*  TODO: organise per-file basis with apt paths, for now, just creating one single folder in the drive and dumping all the files/. */
      
      // Create folder in gdrive

      let folder = {
        name:"testFolder"
      }

      let folderStatus = Gdrive.createFolder( folder);
      console.log(folderStatus);


      //upload each file one by one..
      
      for (i=0;i<torrent.files.length;i++){
          console.log("File uploadss");
          
      }
    }
  }

}

function fetchInfo(torrentId) {
  var torrent = client.get(torrentId);
  if (torrent) {
    var torrentStatus = {
      files: torrent.files.length,
      name: torrent.name,
      progress: torrent.progress * 100,
      downloadSpeed: ((torrent.downloadSpeed/1000>1000)?((torrent.downloadSpeed/1000000).toFixed(2) + " mBps"):((torrent.downloadSpeed/1000).toFixed(2) + " kBps")),
      peers: torrent.numPeers,
      ratio: torrent.ratio,
      time: torrent.timeRemaining
    };
    return torrentStatus;
  }
  return null;
}
