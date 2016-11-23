import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies} from '../api/Discover';
import {GridList, GridTile} from 'material-ui/GridList';
export default class IndexComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null, appBarTitle: "Popular Movies/TV-shows"};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        getPopularMovies().then(jsondata => {
            Store.dispatch({type: 'load_popularMovies', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularMovies: Store.getState().popularMovies});
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

        var movieList = [];
        if (this.state.popularMovies) {
            for (let movie of this.state.popularMovies.results) {
                movieList.push(movie);
            }
        }
        return (
            <div style={styles.root}>
                <GridList style={styles.gridList}>
                    {movieList.map((movie) => {
                        var image = `${ImageUrl}w500/${movie.backdrop_path}`;
                        return (
                            <GridTile
                                key={movie.id}
                                title={movie.original_title}
                            >
                                <img src={image}/>
                            </GridTile>
                        );
                    }, this)}
                </GridList>
            </div>
        )
    }
}
