import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

import theme from '../../utils/theme'

import Icon from '../../utils/MyButton'
import * as dataActions from '../../store/actions/data'

const styles = () => ({
    ...theme,
    deleteButton: {
        left: '90%',
        top: '4%',
        position: 'absolute'
    }
})

class DeleteScream extends Component {
    state = {
        open: false
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
    }
    deleteScream = () => {
        this.props.onDeleteScream(this.props.screamId)
        this.setState({
            open: false
        })
    }
    render() {
        const { classes } = this.props

        return (
            <Fragment>
                <Icon 
                    tip='Delete Scream'
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteIcon color='secondary'/>
                </Icon>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Are you sure you want to delete this scream?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color='secondary'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteScream: (screamId) => dispatch(dataActions.deleteScream(screamId))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteScream))
