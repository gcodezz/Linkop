import React from 'react'

import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import LocationOn from '@material-ui/icons/LocationOn'
import Link from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

import NoImg from '../images/no-img.png'
import theme from '../utils/theme'

const styles = () => ({
    ...theme,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '50%',
        marginBottom: 10
    }
})

const profileSkeleton = (props) => {
    const { classes } = props
    return (
        <Paper>
            <div className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img 
                            src={NoImg} 
                            alt='profile' 
                            className='profile-image' 
                        />
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <div className={classes.handle} />
                        <hr />
                        <div className={classes.fullLine}/>
                        <div className={classes.fullLine}/>
                        <LocationOn color='primary' /> <span>Location</span>
                        <hr />
                        <Link color='primary' /> https://website.com
                        <hr />
                        <CalendarToday color='primary'/> Joined date
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(profileSkeleton)
