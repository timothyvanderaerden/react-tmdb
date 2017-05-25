import React, {Component} from 'react';
import PropTypes from 'prop-types';

import KeywordComponent from '../shared/keywordComponent';
import { ImageUrl } from '../../api/ApiUrl';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';

export default class MovieCardComponent extends Component {
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

    render() {
        const { movie, keywords } = this.props;
        const image = `${ImageUrl}w780${movie.backdrop_path}`;

        return (
            <Card style={{marginBottom: 8}}>
                <CardMedia
                    overlay={
                        <CardTitle
                            title={movie.original_title}
                            subtitle={movie.tagline}/>
                    }>
                    {movie.backdrop_path ?
                        <img src={image}/> : null
                    }
                </CardMedia>
                <CardTitle title="Overview" subtitle={movie.overview}/>
                <Row>
                    <Col xs={6}>
                        <CardTitle title="Facts"/>
                        <CardText>
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
                                {movie.runtime} min
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Budget</strong>
                                $ {movie.budget.toLocaleString('en-US')}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Revenue</strong>
                                $ {movie.revenue.toLocaleString('en-US')}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Homepage</strong>
                                <a href={movie.homepage}>Website</a>
                            </p>
                        </CardText>
                    </Col>
                    <Col xs={6}>
                        <CardTitle title="Genres"/>
                        <CardText>
                            <div style={this.styles.wrapper}>
                                {movie.genres.map(genre => {
                                    return (
                                        <Chip key={genre.id} style={this.styles.chip}>
                                            {genre.name}
                                        </Chip>
                                    );
                                })}
                            </div>
                        </CardText>
                        <CardTitle title="Keywords"/>
                        <CardText>
                            <KeywordComponent keywords={keywords.keywords}/>
                        </CardText>
                    </Col>
                </Row>
            </Card>
        );
    }
}

MovieCardComponent.propTypes = {
  movie: PropTypes.object.isRequired,
  keywords: PropTypes.object.isRequired
};
