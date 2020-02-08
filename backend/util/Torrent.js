const webTorrent = require("webtorrent");
const client = new webTorrent();

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
    // function dwndin() {
    //   resolve({
    //     info: fetchInfo(torrentId),
    //     status: "Downloading",
    //     error: "false"
    //   });
    // }
    // function error() {
    //   resolve({
    //     info: null,
    //     status: "error",
    //     error: true
    //   });
    // }
    // function metadata() {
    //   resolve({
    //     info: null,
    //     status: "metadata",
    //     error: false
    //   });
    // }
    // function ready() {
    //   resolve({
    //     info: null,
    //     status: "ready",
    //     error: false
    //   });
    // }
    // function done() {
    //   resolve({
    //     info: fetchInfo(torrentId),
    //     status: "done",
    //     error: false
    //   });
    // }
    // function nopeers() {
    //   resolve({
    //     info: fetchInfo(torrentId),
    //     status: "No Peers",
    //     error: true
    //   });
    // }

    // torrent.once("ready", ready);
    // torrent.once("download", dwndin);
    // torrent.once("error", error);
    // torrent.once("metadata", metadata);
    // torrent.once("done", done);
    // torrent.once("noPeers", nopeers);

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

function fetchInfo(torrentId) {
  var torrent = client.get(torrentId);
  if (torrent) {
    let fileArr = [],
      i = 0;
    for (file in torrent.files) {
      fileArr[i] = {
        name: file.name,
        size: file.size,
        progress: file.progress * 100
      };
      i++;
    }
    var torrentStatus = {
      files: fileArr,
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
