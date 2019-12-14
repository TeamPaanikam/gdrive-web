import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <AppBar position="static" color="primary">
                    <Toolbar style={{display:"flex", justifyContent:"center"}}>
                        <Link to='/' style={{color:"white", textDecoration:"none"}}>
                        <Typography variant="h6">
                            GDrive Web
                        </Typography>
                        </Link>
                        <Link to='/status' style={{textDecoration:"none"}}><Button uncontained style={{color:"#FFF",marginLeft :"15px", marginRight: "15px"}}>Status</Button></Link>
                        <Button style={{marginLeft :"auto", marginRight: "5px"}} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}