import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeIcon from '@material-ui/icons/Home'

import * as actions from '../../store/actions/auth'
import Icon from '../../utils/MyButton'
import PostScream from '../scream/PostScream'
import Notification from '../notification/Notifications'

class Navbar extends Component {
    logoutHandler = () => {
        this.props.onLogout()
    }
    render() {
        let toolbar = (
            <Toolbar className="nav-container">
                <Button 
                    color="inherit" 
                    component={NavLink} 
                    to="/login"
                >
                    Login
                </Button>
                <Button 
                    color="inherit" 
                    component={NavLink} 
                    to="/"
                >
                    Home
                </Button>
                <Button 
                    color="inherit" 
                    component={NavLink} 
                    to="/signup"
                >
                    Signup
                </Button>
            </Toolbar>
        )

        if (this.props.isAuthenticated) {
            toolbar = (
                <Toolbar className="nav-container">
                    <PostScream />
                    <NavLink to='/'>
                        <Icon tip='Home'>
                            <HomeIcon />
                        </Icon>
                    </NavLink>
                        <Notification />
                </Toolbar>
            )
        }
        return (
            <AppBar>
                {toolbar}
            </AppBar>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);