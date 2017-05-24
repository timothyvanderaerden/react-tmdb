import React from 'react';
import PropTypes from 'prop-types';
import KeywordComponent from '../shared/keywordComponent';
import { ImageUrl } from '../../api/ApiUrl';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';

export default class TvShowCardComponent extends React.Component {
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
        const { tvShow, keywords } = this.props;
        const image = `${ImageUrl}w780${tvShow.backdrop_path}`;

        return (
            <Card style={{marginBottom: 8}}>
                <CardMedia
                    overlay={
                        <CardTitle
                            title={tvShow.original_title}
                            subtitle={`Created by ${tvShow.created_by[0].name}`}/>
                    }>
                    {tvShow.backdrop_path ?
                        <img src={image}/> : null
                    }
                </CardMedia>
                <CardTitle title="Overview" subtitle={tvShow.overview}/>
                <Row>
                    <Col xs={6}>
                        <CardTitle title="Facts"/>
                        <CardText>
                            <p>
                                <strong style={{display: 'block'}}>Status</strong>
                                {tvShow.status}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Original language</strong>
                                {tvShow.original_language}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>First aired</strong>
                                {tvShow.first_air_date.toLocaleString()}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Seasons</strong>
                                {tvShow.number_of_seasons}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Episodes</strong>
                                {tvShow.number_of_episodes}
                            </p>
                            <p>
                                <strong style={{display: 'block'}}>Homepage</strong>
                                <a href={tvShow.homepage}>Website</a>
                            </p>
                        </CardText>
                    </Col>
                    <Col xs={6}>
                        <CardTitle title="Genres"/>
                        <CardText>
                            <div style={this.styles.wrapper}>
                                {tvShow.genres.map(genre => {
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
                            <KeywordComponent keywords={keywords}/>
                        </CardText>
                    </Col>
                </Row>
            </Card>
        );
    }
}

TvShowCardComponent.propTypes = {
  tvShow: PropTypes.object.isRequired,
  keywords: PropTypes.array.isRequired
};
