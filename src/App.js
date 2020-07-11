import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import './App.css'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar from './components/layout/Navbar'
import generalStyle from './utils/theme'
import user from './pages/user'

import * as actions from './store/actions/auth'

const theme = createMuiTheme(generalStyle)

axios.default.baseURL = 'https://us-central1-linkop-df797.cloudfunctions.net/api'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
        <Route exact path="/users/:handle" component={user} />
        <Route exact path="/users/:handle/scream/:screamId" component={user} />
        <Route exact path="/" component={home} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/users/:handle" component={user} />
          <Route exact path="/users/:handle/scream/:screamId" component={user} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <div className="container">
            {routes}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));