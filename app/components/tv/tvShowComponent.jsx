import React from 'react';
import Store from '../../store';
import {
    getTvShowById, getKeywordsForTvShow,
    getCastForTvShow, getSimilarTvShows
} from '../../api/Tv';
import TvShowCardComponent from './tvShowCardComponent';
import SeasonComponent from '../shared/seasonsComponent';
import SidebarComponent from '../shared/sidebarComponent';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';

export default class TvShowComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const tvShowId = this.props.params.tvShowId;
        this.state = { showLoaded: false };
        Store.dispatch({type: 'appbar_title', data: this.props.params.tvShowName});
        Store.dispatch({type: 'appbar_navigationBack', data: true});
        
        this.getTvShowData(tvShowId);

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                tvShow: Store.getState().tvShow,
                keywords: Store.getState().keywords,
                cast: Store.getState().cast,
                similar: Store.getState().similar,
                location: Store.getState().location
            });
        });
    }

    componentWillUpdate(nextState) {
        if (this.state.location !== nextState.location && this.state.location !== undefined) {
            const [ , , tvshowId, tvShowTitle ] = nextState.location.pathname.split('/');
            Store.dispatch({type: 'appbar_title', data: tvShowTitle});
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
            Store.dispatch({type: 'load_tvShow', data: show});
            Store.dispatch({type: 'load_keywords', data: keywords});
            Store.dispatch({type: 'load_cast', data: cast});
            Store.dispatch({type: 'load_similar', data: similar});
        }).then(() => {
            this.setState({showLoaded: true});
        })
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
            )
        } else {
            return (
                <LoadingComponent/>
            )
        }
    }
}