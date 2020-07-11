import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'

import Icon from '../../utils/MyButton'
import * as screamActions from '../../store/actions/data'
import LikeButton from './LikeButton'
import Comments from '../comment/Comment'
import theme from '../../utils/theme'
import CommentForm from '../comment/CommentForm'

const styles = () => ({
    ...theme,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginBottom: 50
    },
    DialogContent: {
        marginTop: 20
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname

        const { userHandle, screamId } = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`
        }
        window.history.pushState(null, null, newPath)

        this.setState({
            open: true, 
            oldPath, 
            newPath
        })
        this.props.onGetScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({
            open: false
        })
    }
    render() {
        const { 
            classes,
            scream: {
                screamId,
                body,
                createdAt, 
                likeCount,
                commentCount,
                userImage,
                comments,
                userHandle
            },
            loading
        } = this.props
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={3}>
                <Grid item sm={5}>
                    <img 
                        src={userImage} 
                        alt='ProfileImage' 
                        className={classes.profileImage} 
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={NavLink}
                        color='primary'
                        variant='h5'
                        to={`/user/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {moment(createdAt).format('h:mm: a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} {likeCount <= 1 ? 'like' : 'likes'}</span>
                    <Icon tip='comments' placement='top'>
                        <ChatIcon color='primary' />
                    </Icon>
                    <span>{commentCount} {commentCount <= 1 ? 'comment' : 'comments'}</span>
                </Grid>
                {commentCount >= 1 && <hr className={classes.visibleSeperator} />}
                <CommentForm screamId={screamId} />
                <Comments comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <Icon 
                    onClick={this.handleOpen} 
                    tip='Expand scream' 
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color='primary'/>
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
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.UI.loadingScream,
        scream: state.data.scream
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onGetScream: (screamId) => dispatch(screamActions.getScream(screamId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScreamDialog))
