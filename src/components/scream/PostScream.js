import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import withStyles from '@material-ui/styles/withStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'

import theme from '../../utils/theme'
import * as dataActions from '../../store/actions/data'
import Icon from '../../utils/MyButton'

const styles = () => ({
    ...theme,
    button: {
       float: 'right'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '1%'
    },
    submitButton: {
        position: 'relative',
        marginTop: 10,
        marginBottom: 10,
        left: '80%'
    }
})

class PostScream extends Component {
    state = {
        open: false,
        body: ''
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
        this.props.onClearErrors()
    }
    handleChange = (event) => {
        this.setState({
            body: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onPostScream(this.state.body)
        if (this.state.body.length >= 1) {
            this.setState({
                body: ''
            })
            this.handleClose()
        }
    }
    render() {
        const { classes, errors, loading } = this.props
        return (
            <Fragment>
                <Icon 
                    onClick={this.handleOpen} 
                    tip='Post a scream' 
                    placement='bottom'
                >
                    <AddIcon />
                </Icon>
                <Dialog 
                    open={this.state.open} 
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <Icon 
                        tip='Close' 
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </Icon>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='scream'
                                type='text'
                                label='SCREAM!!!'
                                multiline
                                error={errors ? true : false}
                                helperText={errors && errors.scream}
                                rows='3'
                                placeholder="What's on your mind?"
                                className={classes.textField}
                                value={this.state.body}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button 
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.submitButton}
                            >
                                {loading ? <CircularProgress size={20} /> : 'Submit'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        loading: state.UI.postingScream,
        errors: state.UI.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPostScream: (scream) => dispatch(dataActions.postScream(scream)),
        onClearErrors: () => dispatch(dataActions.clearErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostScream))
