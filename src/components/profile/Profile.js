import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import Link from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import * as userActions from '../../store/actions/user'
import * as authActions from '../../store/actions/auth'
import EditDetails from './EditDetails'
import Icon from '../../utils/MyButton'
import ProfileSkeleton from '../../utils/profileSkeleton'
import theme from '../../utils/theme'

const styles = () => ({
    ...theme
})

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    render() {
        const {
            classes,
            isAuthenticated,
            user: {
                loading,
                error,
                credentials: { 
                    handle, 
                    createdAt, 
                    imageUrl, 
                    bio, 
                    website, 
                    location 
                }
            }
        } = this.props

        let profileMarkup = !loading ? (isAuthenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image'/>
                        <input 
                            type='file' 
                            id='imageInput' 
                            hidden='hidden'
                            onChange={this.handleImageChange}
                        />
                        <Icon 
                            tip='Edit profile picture' 
                            placement='top' 
                            onClick={this.handleEditPicture} 
                            className='button'
                        >
                            <EditIcon color='primary' />
                        </Icon>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <MuiLink 
                            component={NavLink} 
                            to={`/users/${handle}`} 
                            color='primary' 
                            variant='h5'
                        >
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {error && (
                            <Fragment>
                                <ErrorOutline color='secondary' variant='caption'/>
                                <Typography color='secondary' variant='caption'>{error}</Typography>
                                <hr/>
                            </Fragment>  
                        )}
                        <hr/>
                        {bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color='primary'/> <span>{location}</span>
                                <hr/>
                            </Fragment>
                            
                        )}
                        {website && (
                            <Fragment>
                                <Link color='primary'/>
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color='primary'/>{'  '}
                        <span>Joined {moment(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
                <Icon title='Logout' tip='Logout' placement='top' onClick={() => {
                    this.props.onLogout()
                }}>
                    <KeyboardReturn color='primary'/>
                </Icon>
                <EditDetails />
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, Please login!
                </Typography>
                <div className={classes.buttons}>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        component={NavLink}
                        to='/login'
                    >
                        Login
                    </Button>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        component={NavLink}
                        to='/signup'
                    >
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : <ProfileSkeleton />

        return profileMarkup
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isAuthenticated: state.auth.token !== null
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        uploadImage: (formData) => dispatch(userActions.uploadImage(formData)),
        onLogout: () => dispatch(authActions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))