import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { element } from "prop-types";
class Status extends Component {
  state = {
    info: {
      files: {
        file: 0
      },
      progress: 0,
      downloadSpeed: 0,
      peers: 0,
      time: 0
    },
    status: "NA",
    error: "na"
  };

  componentDidMount = () => {
    axios
      .post(
        "http://localhost:8000/fetchTorrentState",
        { torrentId: localStorage.getItem("torrentId") },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          height: "90vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Paper>
          <Typography
            variant="h3"
            component="h3"
            style={{ textAlign: "center" }}
          >
            Status
          </Typography>
          <hr />

          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Info:
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Error: {this.state.error}
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Status: {this.state.status}
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            {/* Progress:{this.state.info.progress} */}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Status;
