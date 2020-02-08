var torrentState;
function onSubmit() {
    console.log("dab gaya");
    var torrentId = document.getElementById("torrentId").value
    console.log(torrentId);
    localStorage.setItem("torrentId", torrentId)
    document.getElementById("url").submit();
}

// function fetchState() {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = () => {
//         if(this.readyState === 4  && this.status === 200){
//             torrentState = request.response;
//         }
//     }
//     request.responseType = "json"
//     request.open("POST", "/fetchTorrentState", true);
//     request.send({
//         torrentId : localStorage.getItem("torrentId")
//     });
// }
// setTimeout(fetchState, 1000);


function status(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if(this.readyState === 4  && this.status === 200){
            torrentState = request.response;
        }
        // else
        //     console.log(this.readyState);
        //     console.log(this.status);

    }
    request.responseType = "json"
    request.open("POST", "/fetchTorrentState", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({"torrentId": localStorage.getItem("torrentId")})); 
    console.log("status is "  );
    console.log(torrentState);

}
