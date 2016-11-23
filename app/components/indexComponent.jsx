import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies, getPopularShows} from '../api/Discover';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Row, Col} from 'react-flexbox-grid/lib/index'
import SwipeableViews from 'react-swipeable-views';


export default class IndexComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null, popularShows: null, appBarTitle: "Popular", slideIndex: 0};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        getPopularMovies().then(jsondata => {
            Store.dispatch({type: 'load_popularMovies', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularMovies: Store.getState().popularMovies});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularShows: Store.getState().popularShows});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange(value) {
        if (!this.state.popularShows) {
            getPopularShows().then(jsondata => {
                Store.dispatch({type: 'load_popularShows', data: jsondata});
            });
        }
        this.setState({slideIndex: value});
    }

    render() {
        var movieList = [];
        if (this.state.popularMovies) {
            for (let movie of this.state.popularMovies.results) {
                movieList.push(movie);
            }
        }

        var showList = [];
        if (this.state.popularShows) {
            for (let show of this.state.popularShows.results) {
                showList.push(show);
            }
        }

        return (
            <div>
                <Tabs
                    onChange={this.handleChange.bind(this)}
                    value={this.state.slideIndex}
                >
                    <Tab label="Movies" value={0}/>
                    <Tab label="TV Shows" value={1}/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange.bind(this)}
                >
                    <Row style={{margin: 8}}>
                        {movieList.map((movie) => {
                            var image = `${ImageUrl}w500/${movie.backdrop_path}`;
                            return (
                                <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                                    <Card>
                                        <CardMedia>
                                            <img src={image}/>
                                        </CardMedia>
                                        <CardTitle
                                            title={movie.original_title}
                                        >
                                        </CardTitle>
                                        <CardText>
                                            {movie.overview}
                                        </CardText>
                                    </Card>
                                </Col>
                            );
                        }, this)}
                    </Row>
                    <Row style={{margin: 8}}>
                        {showList.map((show) => {
                            var image = `${ImageUrl}w500/${show.backdrop_path}`;
                            return (
                                <Col xs={12} sm={6} md={6} lg={4} key={show.id} style={{marginBottom: 12}}>
                                    <Card>
                                        <CardMedia>
                                            <img src={image}/>
                                        </CardMedia>
                                        <CardTitle
                                            title={show.original_name}
                                        />
                                        <CardText>
                                            {show.overview}
                                        </CardText>
                                    </Card>
                                </Col>
                            );
                        }, this)}
                    </Row>
                </SwipeableViews>
            </div>
        )
    }
}
