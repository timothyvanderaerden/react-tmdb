import React from 'react';
import PropTypes from 'prop-types';
import { ImageUrl } from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { Card, CardTitle } from 'material-ui/Card';

export default class SeasonsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { seasons } = this.props;

        return (
            <Card style={{marginBottom: 8}}>
                <CardTitle title="Seasons"/>
                <List>
                    {seasons.map(season => {
                        const image = season.poster_path ?
                            `${ImageUrl}w300${season.poster_path}` :
                            '/app/resources/images/poster_avatar_placeholder.png';
                        return (
                            <ListItem
                                key={season.id}
                                primaryText={season.air_date}
                                secondaryText={`Episodes: ${season.episode_count}`}
                                leftAvatar={<Avatar src={image} />}
                            />
                        );
                    })}
                </List>
            </Card>
        );
    }
}

SeasonsComponent.propTypes = {
  seasons: PropTypes.array.isRequired,
};
