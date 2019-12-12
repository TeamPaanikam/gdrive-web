import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
class Header extends Component {
    render() {
        return (
            <div className="Header">

                <AppBar position="static" color="primary">
                    <Toolbar style={{display:"flex", justifyContent:"center"}}>
                        <IconButton edge="start"  color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            GDrive Web
                        </Typography>
                        <Button style = {{marginLeft :"auto", marginRight: "5px"}} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>


            </div>
        );
    }
}

export default Header;
