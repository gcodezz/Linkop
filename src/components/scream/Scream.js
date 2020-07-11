import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'

import Icon from '../../utils/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

const styles = {
    button: {
        float: 'right'
    },
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 15
    },
    image: {
        minWidth: 130,
        minHeight: 100,
    },
    content: {
        padding: 15,
        objectFit: 'cover'
    }
}
class Scream extends Component {
    render() {
        const { 
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                likeCount,
                screamId,
                commentCount
            },
            isAuthenticated
        } = this.props
        let deleteButton = (isAuthenticated && this.props.user.credentials.handle === userHandle) && (
            <DeleteScream screamId={screamId} />
        )
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile image'
                    className={classes.image}
                />
                <CardContent>
                    <Typography 
                        variant='body2' 
                        component={NavLink} 
                        to={`/users/${userHandle}`}
                        color='primary'
                    >{userHandle}</Typography>
                    <span>
                        <Typography variant='body2' color='textSecondary'>
                            {moment(`${createdAt}`).endOf('day').fromNow()}
                        </Typography>
                    </span>
                    <span className='button'>{deleteButton}</span>
                    <Typography variant='body1'>{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} {likeCount <= 1 ? 'like' : 'likes'}</span>
                    <Icon tip='comments' placement='top'>
                        <ChatIcon color='primary' />
                    </Icon>
                    <span>{commentCount} {commentCount <= 1 ? 'comment' : 'comments'}</span>
                    <ScreamDialog 
                        screamId={screamId} 
                        userHandle={userHandle}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Scream))
