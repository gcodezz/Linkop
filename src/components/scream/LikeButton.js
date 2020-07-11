import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

import Icon from '../../utils/MyButton'
import * as dataActions from '../../store/actions/data'

class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && 
            this.props.user.likes.find(
                like => like.screamId === this.props.screamId
            )) {
                return true
            } else {
                return false
            }
    }
    likeScream = () => {
        this.props.onLikeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.onUnlikeScream(this.props.screamId)
    }
    render() {
        const { isAuthenticated } = this.props
        const likeButton = !isAuthenticated ? (
            <NavLink to='/login'>
                <Icon tip='like'>
                        <FavoriteBorder color='primary'/>
                </Icon>
            </NavLink>
        ) : (
            this.likedScream() ? (
                <Icon tip='unlike' onClick={this.unlikeScream}>
                    <FavoriteIcon color='primary' />
                </Icon>
            ) : (
                <Icon tip='like' onClick={this.likeScream}>
                    <FavoriteBorder color='primary' />
                </Icon>
            )
        )
        return (
            likeButton
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLikeScream: (screamId) => dispatch(dataActions.likeScream(screamId)),
        onUnlikeScream: (screamId) => dispatch(dataActions.unlikeScream(screamId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)
