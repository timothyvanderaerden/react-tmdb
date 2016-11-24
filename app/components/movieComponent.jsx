/**
 * Created by timothy on 24/11/16.
 */
import React from 'react';
import Store from '../store';
import {getMovieById} from '../api/Movies';
import {ImageUrl} from '../api/ApiUrl';
import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class MovieComponent extends React.Component {
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
        this.state = {appBarTitle: "Movie", movie: null};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        getMovieById(this.props.params.movieId).then(jsondata => {
            Store.dispatch({type: 'load_movie', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({movie: Store.getState().movie});
        });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.movie) {
            var movie = this.state.movie;
            var image = `${ImageUrl}w1280/${movie.backdrop_path}`;

            return (
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={movie.original_title}/>}
                    >
                        <img src={image}/>
                    </CardMedia>
                    <CardTitle subtitle={movie.overview}/>
                    <CardText>
                        <Row>
                            <Col xs={6}>
                                <h2>Facts</h2>
                                <p>
                                    <strong style={{display: 'block'}}>Status</strong>
                                    {movie.status}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Original language</strong>
                                    {movie.original_language}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Runtime</strong>
                                    {movie.runtime}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Budget</strong>
                                    $ {movie.budget}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Revenue</strong>
                                    $ {movie.revenue}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Homepage</strong>
                                    <a href={movie.homepage}>{movie.homepage}</a>
                                </p>
                            </Col>
                            <Col xs={6}>
                                <h2>Genres</h2>
                                <div style={this.styles.wrapper}>
                                    {movie.genres.map((genre) => {
                                        return (
                                            <Chip key={genre.id} style={this.styles.chip}>
                                                {genre.name}
                                            </Chip>
                                        )
                                    })}
                                </div>
                            </Col>
                        </Row>
                    </CardText>
                </Card>
            )
        } else {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12}>
                        <Row center="xs">
                            <CircularProgress />
                        </Row>
                    </Col>
                </Row>
            )
        }
    }
}