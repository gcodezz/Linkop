import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as actions from '../store/actions/auth'

const styles = {
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        position: 'relative'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
}

class signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    }
    render() {
        const { classes } = this.props

        const handleSubmit = (event) => {
            event.preventDefault()
            this.props.onSignup(
                this.state.email, 
                this.state.password, 
                this.state.confirmPassword, 
                this.state.handle
            )
        }
        const handleChange = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant='h2' className={classes.pageTitle}>
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id='email'
                            name='email'
                            type='email'
                            label='Email'
                            helperText={this.props.errors.email}
                            error={this.props.errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id='password'
                            name='password'
                            type='password'
                            label='Password'
                            helperText={this.props.errors.password}
                            error={this.props.errors.password ? true : false}
                            value={this.state.password}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            helperText={this.props.errors.confirmPassword}
                            error={this.props.errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id='handle'
                            name='handle'
                            type='text'
                            label='Handle'
                            helperText={this.props.errors.handle}
                            error={this.props.errors.handle ? true : false}
                            value={this.state.handle}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth
                        />
                        {this.props.errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {this.props.errors.general}
                            </Typography>
                        )}
                        
                        <Button 
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={this.props.loading ? true : false}
                        >{this.props.loading ? <CircularProgress size={20} /> : 'SIGNUP'}</Button><br/>
                        <small>Already have an account? Login
                            <NavLink to='/signup'> here</NavLink>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        errors: state.auth.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (email, password, confirmPassword, handle) => dispatch(actions.signup(email, password, confirmPassword, handle)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(signup))