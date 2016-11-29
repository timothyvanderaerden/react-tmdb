import React from 'react';
import {ImageUrl} from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import {Card, CardTitle} from 'material-ui/Card';

export default class SeasonsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const seasons = this.props.seasons;

        return (
            <Card style={{marginBottom: 8}}>
                <CardTitle title="Seasons"/>
                <List>
                    {seasons.map(season => {
                        const image = `${ImageUrl}w300${season.poster_path}`;
                        return (
                            <ListItem
                                key={season.id}
                                primaryText={season.air_date}
                                secondaryText={`Episodes: ${season.episode_count}`}
                                leftAvatar={<Avatar src={image} />}
                            />
                        )
                    })}
                </List>
            </Card>
        )
    }
}