import React, { Component } from 'react';
import logo from '../public/logo.png';
import './App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import axios from 'axios';
class Body extends Component {
    render() {
        return (
            <div className="Body" style ={{display:"flex", height: "80vh", margin: "auto",flexDirection :"column", justifyContent: "center", alignItems :"center"}}>
                <img src={logo} style={{ margin:"5px", height:"10%"}}></img>
                <form>
                    <Input name="torrentID" id="torrentID"  type="text" placeholder="URL here"/>
                    <Button variant="contained" onClick={Click} color="primary" type="button"  style={{margin:"5px"}}> Submit </Button>
                </form>
            </div>
        );
    }
}

function Click(){
    console.log("Clicked")
    var torrentId=document.getElementById("torrentID").value;
    axios.post("http://localhost:3001/addTorrent",
    {torrentId},
    {headers:{'Content-Type':'application/json'}}
    ).then(resp=>{
        console.log(resp.data);
    });
}

export default Body;
