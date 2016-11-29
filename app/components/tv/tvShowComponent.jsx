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
        this.state = {
            appBarTitle: "TV Show",
            tvShow: null,
            keywords: null,
            cast: null,
            similar: null,
            loaded: false
        };
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});
        Store.dispatch({type: 'loading_state', data: this.state.loaded});

        this.getTvShowData(tvShowId);

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                tvShow: Store.getState().tvShow,
                keywords: Store.getState().keywords,
                cast: Store.getState().cast,
                similar: Store.getState().similar,
                loaded: Store.getState().loaded
            });
        });
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
            Store.dispatch({type: 'loading_state', data: true});
        })
    }

    render() {
        if (this.state.loaded) {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12} md={8}>
                        <TvShowCardComponent keywords={this.state.keywords.results} tvShow={this.state.tvShow}/>
                        <SeasonComponent seasons={this.state.tvShow.seasons}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <SidebarComponent cast={this.state.cast} similar={this.state.similar}/>
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