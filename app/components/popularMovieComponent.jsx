/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies} from '../api/Discover';
import {getMovieGenres} from '../api/Genres';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index'


export default class PopularMovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    componentWillMount() {
        this.state = {popularMovies: null, movieGenres: null};

        getPopularMovies().then(jsondata => {
            Store.dispatch({type: 'load_popularMovies', data: jsondata});
        });

        getMovieGenres().then(jsondata => {
            Store.dispatch({type: 'load_movieGenres', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularMovies: Store.getState().popularMovies});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({movieGenres: Store.getState().movieGenres});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var movieList = [];
        var genreList = [];
        if (this.state.popularMovies && this.state.movieGenres) {
            for (let movie of this.state.popularMovies.results) {
                movieList.push(movie);
            }

            for (let genre of this.state.movieGenres.genres) {
                genreList.push(genre);
            }
        }

        return (
            <Row style={{margin: 8}}>
                {movieList.map((movie) => {
                    var image = `${ImageUrl}w500/${movie.backdrop_path}`;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    <img src={image}/>
                                </CardMedia>
                                <CardTitle title={movie.original_title}/>
                                <CardText>
                                    {movie.overview}
                                </CardText>
                                <CardActions>
                                    <div style={this.styles.wrapper}>
                                        {movie.genre_ids.map((id) => {
                                            var genre = genreList.find((x) => {
                                                return x.id === id;
                                            });
                                            return (
                                                <Chip key={id} style={this.styles.chip}>
                                                    {genre.name}
                                                </Chip>
                                            );
                                        })}
                                    </div>
                                </CardActions>
                            </Card>
                        </Col>
                    );
                }, this)}
            </Row>
        )
    }
}