import React from 'react';
import Store from '../../store';
import {Link} from 'react-router';
import {ImageUrl} from '../../api/ApiUrl';
import {Row} from 'react-flexbox-grid/lib/index';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PosterComponent from '../shared/posterComponent';

export default class SearchComponent extends React.Component {
    componentWillMount() {
        this.state = {searchResult: null};
        Store.dispatch({type: 'search_bar', data: true});

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                searchResult: Store.getState().searchResult,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {searchResult} = this.state;
        if (searchResult) {
            const movies = searchResult.results.filter(x => x.media_type === 'movie' && x.poster_path !== null);
            const tvShows = searchResult.results.filter(x => x.media_type === 'tv' && x.poster_path !== null);
            return (
                <List style={{margin: 8}}>
                    {movies ?
                        <ListItem disabled={true}>
                            <Subheader>Movies</Subheader>
                            <Row center="xs">
                                {movies.map(movie => {
                                    const image = `${ImageUrl}w154${movie.poster_path}`;
                                    return (
                                        <Link to={`/movie/${movie.id}/${movie.original_title}`}>
                                            <PosterComponent poster={image}/>
                                        </Link>
                                    )
                                })}
                            </Row>
                        </ListItem>
                        : null
                    }
                    {tvShows ?
                        <ListItem disabled={true}>
                            <Subheader>TV Shows</Subheader>
                            <Row center="xs">
                                {tvShows.map(show => {
                                    const image = `${ImageUrl}w154${show.poster_path}`;
                                    return (
                                        <Link to={`/tv/${show.id}/${show.original_name}`}>
                                            <PosterComponent poster={image}/>
                                        </Link>
                                    )
                                })}
                            </Row>
                        </ListItem>
                        : null
                    }
                </List>
            )
        } else {
            return null
        }
    }
}