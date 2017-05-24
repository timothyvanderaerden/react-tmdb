import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { appBarActions } from '../../actions';
import {
    getTvShowById, getKeywordsForTvShow,
    getCastForTvShow, getSimilarTvShows
} from '../../api/Tv';
import TvShowCardComponent from './tvShowCardComponent';
import SeasonComponent from '../shared/seasonsComponent';
import SidebarComponent from '../shared/sidebarComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';

class TvShowComponent extends Component {
    componentWillMount() {
        const tvShowId = this.props.params.tvShowId;
        this.state = { showLoaded: false };
        this.props.actions.changeAppBarTitle(this.props.params.tvShowName);

        this.getTvShowData(tvShowId);
    }

    componentWillUpdate(nextState) {
        if (this.state.location !== nextState.location && this.state.location !== undefined) {
            const [ , , tvshowId, tvShowTitle ] = nextState.location.pathname.split('/');
            this.props.actions.changeAppBarTitle(tvShowTitle);
            this.getTvShowData(tvshowId);
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getTvShowData(tvShowId) {
        Promise.all([
            getTvShowById(tvShowId),
            getKeywordsForTvShow(tvShowId),
            getCastForTvShow(tvShowId),
            getSimilarTvShows(tvShowId)
        ]).then((data) => {
            let [ show, keywords, cast, similar ] = data;
            this.setState({tvShow: show});
            this.setState({keywords: keywords});
            this.setState({cast: cast});
            this.setState({similar: similar});
        }).then(() => {
            this.setState({showLoaded: true});
        });
    }

    render() {
        const { showLoaded, keywords, tvShow, cast, similar } = this.state;
        if (showLoaded) {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12} md={8}>
                        <TvShowCardComponent keywords={keywords.results} tvShow={tvShow}/>
                        <SeasonComponent seasons={tvShow.seasons}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SidebarComponent cast={cast} similar={similar}/>
                    </Col>
                </Row>
            );
        } else {
            return (
                <LoadingComponent/>
            );
        }
    }
}

TvShowComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowComponent);
