import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies, getPopularShows} from '../api/Discover';
import {GridList, GridTile} from 'material-ui/GridList';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Grid, Col} from 'react-flexbox-grid/lib/index'

export default class IndexComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null, popularShows: null, appBarTitle: "Dashboard"};
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

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                overflowY: 'auto',
            },
        };

        function getTVShows(tab) {
            if (!tab.props.data) {
                getPopularShows().then(jsondata => {
                    Store.dispatch({type: 'load_popularShows', data: jsondata});
                });
            }
        }

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
            <Tabs>
                <Tab label="Movies">
                    <GridList style={styles.gridList}>
                        {movieList.map((movie) => {
                            var image = `${ImageUrl}w500/${movie.backdrop_path}`;
                            return (
                                <GridTile
                                    key={movie.id}
                                    title={movie.original_title}
                                    subtitle={movie.overview}
                                >
                                    <img src={image}/>
                                </GridTile>
                            );
                        }, this)}
                    </GridList>
                </Tab>
                <Tab label="TV Shows"
                     data={this.state.popularShows}
                     onActive={getTVShows}>
                    <GridList style={styles.gridList}>
                        {showList.map((show) => {
                            var image = `${ImageUrl}w500/${show.backdrop_path}`;
                            return (
                                <GridTile
                                    key={show.id}
                                    title={show.original_name}
                                    subtitle={show.overview}
                                >
                                    <img src={image}/>
                                </GridTile>
                            );
                        }, this)}
                    </GridList>
                </Tab>
            </Tabs>

        )
    }
}
