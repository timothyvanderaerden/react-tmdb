import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ImageUrl } from '../../api/ApiUrl';
import backdropImage from '../../resources/images/backdrop_placeholder.png';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';

class TvShowCardsComponent extends React.Component {
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

    _handleClick = (id, name) => {
        this.props.history.push(`/tv/${id}/${name}`);
    };

    render() {
        const {tvShows, tvGenres, movieGenres} = this.props;
        const genreList = tvGenres.genres.concat(movieGenres.genres);

        return (
            <Row style={{margin: 8}}>
                {tvShows.results.map(show => {
                    const image = show.backdrop_path ?
                        `${ImageUrl}w500/${show.backdrop_path}` :
                        backdropImage;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={show.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    <img src={image} style={{cursor: 'pointer'}}
                                         onClick={() => {
                                             this._handleClick(show.id, show.original_name);
                                         }}/>
                                </CardMedia>
                                <CardTitle title={show.original_name} style={{cursor: 'pointer'}}
                                           onTouchTap={() => {
                                               this._handleClick(show.id, show.original_name);
                                           }}/>
                                <CardText>
                                    {show.overview}
                                </CardText>
                                <CardActions>
                                    <div style={this.styles.wrapper}>
                                        {show.genre_ids.map(id => {
                                            const genre = genreList.find(x => x.id === id);
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
                })}
            </Row>
        );
    }
}

TvShowCardsComponent.propTypes = {
  tvShows: PropTypes.object.isRequired,
  tvGenres: PropTypes.object.isRequired,
  movieGenres: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(TvShowCardsComponent);
