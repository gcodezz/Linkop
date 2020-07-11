import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import withStyles from '@material-ui/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import theme from '../../utils/theme'

import * as userActions from '../../store/actions/user'

const styles = () => ({
    ...theme,
    button: {
       float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.mapUserDetailsToState(this.props.credentials)
        //console.log(this.props.credentials)
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.onUpdateUserDetails(userDetails)
        this.handleClose()
    }
    
    componentDidMount() {
        const { credentials } = this.props
        this.mapUserDetailsToState(credentials)
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Tooltip title='Edit details' placement='top'>
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                id='bio'
                                name='bio'
                                type='text'
                                label='Bio'
                                multiline
                                rows='3'
                                placeholder='A short bio of yourself'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id='website'
                                name='website'
                                type='text'
                                label='Website'
                                placeholder='Your website?'
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id='location'
                                name='location'
                                type='text'
                                label='Where are you located?'
                                placeholder=''
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={this.handleClose}
                            color='secondary'
                        >Cancel</Button>
                        <Button 
                            onClick={this.handleSubmit}
                            color='primary'
                        >Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.user.credentials,
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUserDetails: (userDetails) => dispatch(userActions.updateUserDetails(userDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails))