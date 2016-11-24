/**
 * Created by timothy on 24/11/16.
 */
import React from 'react';
import Store from '../store';
import {getMovieById} from '../api/Movies';
import {ImageUrl} from '../api/ApiUrl';
import {Card, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class MovieComponent extends React.Component {
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
                        overlay={<CardTitle title={movie.original_title} />}
                    >
                        <img src={image}/>
                    </CardMedia>
                    <CardTitle subtitle={movie.overview}/>
                    <CardText>

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