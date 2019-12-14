import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import axios from "axios";
export default class Status extends Component {
  state = {
    info: {
      files: {
        file: 0
      },
      name: "Fetching, please wait...",
      progress: 0,
      downloadSpeed: 0,
      peers: 0,
      time: 0
    },
    status: "NA",
    error: "NA"
  };

  componentDidMount = () => {
    this.timer = setInterval(() => {
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
    }, 5000);
  };
  componentWillUnmount = () => {
    clearInterval(this.timer);
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
        <Paper elevation="18" style={{padding: "15px"}}>
          <Typography
            variant="h3"
            component="h3"
            style={{ textAlign: "center" }}
          >
            Status
          </Typography>
          <hr />

          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Name: {this.state.info.name}
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Error: {this.state.error.toString()}
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Status: {this.state.status}
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Progress: {Number(this.state.info.progress).toFixed(2)}%
          </Typography>
          <Typography variant="h5" component="h5" style={{ textAlign: "left" }}>
            Download Speed: {this.state.info.downloadSpeed}
          </Typography>
        </Paper>
      </div>
    );
  }
}
