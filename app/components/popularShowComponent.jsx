/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularShows} from '../api/Discover';
import {getTVGenres} from '../api/Genres';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import {Row, Col} from 'react-flexbox-grid/lib/index'

export default class PopularShowComponent extends React.Component {
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
        this.state = {popularShows: null, tvGenres: null, movieGenres: null};

        getPopularShows().then(jsondata => {
            Store.dispatch({type: 'load_popularShows', data: jsondata});
        });

        getTVGenres().then(jsondata => {
            Store.dispatch({type: 'load_tvGenres', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                popularShows: Store.getState().popularShows,
                tvGenres: Store.getState().tvGenres,
                movieGenres: Store.getState().movieGenres
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var showList = [];
        var genreList = [];
        if (this.state.popularShows && this.state.tvGenres) {
            showList = this.state.popularShows.results;
            genreList = this.state.tvGenres.genres.concat(this.state.movieGenres.genres);
        }

        return (
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
                                <CardActions>
                                    <div style={this.styles.wrapper}>
                                        {show.genre_ids.map((id) => {
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