import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'
import ScreamSkeleton from '../utils/ScreamSkeleton'
import * as screamActions from '../store/actions/data'

class home extends Component {
    componentDidMount() {
        this.props.onGetScreams()
    }
    render() {
        const { screams, loading } = this.props.data
        let recentScreamsMarkup = !loading ? (
            screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
            <ScreamSkeleton />
        )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetScreams: () => dispatch(screamActions.getScreams())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(home)