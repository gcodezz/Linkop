import React, { Component } from 'react'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as dataActions from '../../store/actions/data'
import theme from '../../utils/theme'

const styles = () => ({
    ...theme
})

export class CommentForm extends Component {
    state = {
        comment: '',
        loading: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmitComment(this.props.screamId, this.state.comment)
        this.setState({
            comment: ''
        })
    }

    render() {
        const { classes, errors, postingComment, isAuthenticated } = this.props
        const commentFormMarkup = isAuthenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        name='comment'
                        type='text'
                        label='Comment'
                        error={errors ? true : false}
                        helperText={errors && errors.comment}
                        placeholder="Comment on this scream..."
                        className={classes.textField}
                        value={this.state.comment}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Button 
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.submitButton}
                        disabled={(postingComment || this.state.comment.trim().length === 0) ? true : false}
                    >
                        {postingComment ? <CircularProgress size={20} /> : 'Submit'}
                    </Button>
                </form>
               {this.props.screams > 0 && <hr className={classes.visibleSeperator}/>} 
            </Grid>
        ) : null

        return (
            commentFormMarkup
        )
    }
}

const mapStateToProps = state => {
    return {
        postingComment: state.UI.postingComment,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitComment: (screamId, comment) => dispatch(dataActions.submitComment(screamId, comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentForm))
