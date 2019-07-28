var torrentState;
function onSubmit() {
    var torrentId = document.getElementById("torrentId").value
    localStorage.setItem("torrentId", torrentId)
    document.getElementById("url").submit();
}

function fetchState() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if(this.readyState === 4  && this.status === 200){
            torrentState = request.response;
        }
    }
    request.responseType = "json"
    request.open("POST", "/fetchTorrentState", true);
    request.send({
        torrentId : localStorage.getItem("torrentId")
    });
}

setTimeout(fetchState, 1000);