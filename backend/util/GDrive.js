const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = "token.json";

fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
});

function authorize(credentials, callback, data) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback, data);
    oAuth2Client.setCredentials(JSON.parse(token));
    return callback(oAuth2Client, data);
  });
}

function getAccessToken(oAuth2Client, callback, data) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      return callback(oAuth2Client, data);
    });
  });
}

exports.createFolder = (folder) => {
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), createFolder, folder);
  });
};

function createFolder(auth, folder) {
  const drive = google.drive({ version: "v3", auth });
  var fileMetadata = {
    name: folder.name,
    mimeType: "application/vnd.google-apps.folder",
  };
  return drive.files.create({ resource: fileMetadata, fields: "id" }, function (err,res){
    if (err) {
      console.log(err);
    } else {
      console.log("Folder Id: ", res.data.id);
    }
  });
}

exports.uploadToFolder = (data) => {
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    return authorize(JSON.parse(content), uploadFile, data);
  });
};
function uploadFile(auth, data) {
  const drive = google.drive({ version: "v3", auth });
  var folderid = data.folder.id || "12VJxTJoV1vTW6sH9V9JB1lyqQLMe0vcE";
  var fileMetadata = {
    name: data.file.name || "test.jpg",
    parents: [folderid],
  };
  var media = {
    body: fs.createReadStream("./servertogdrive/test22.jpg"),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, res) {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log("File Id: ", res.data.id);
      }
    }
  );
}
