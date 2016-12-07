import React from 'react';
import {Card, CardMedia} from 'material-ui/Card';

export default class PosterComponent extends React.Component {
    render() {
        const {poster} = this.props;
        return (
            <Card style={{width: 154, margin: 4}}>
                <CardMedia>
                    <img src={poster}/>
                </CardMedia>
            </Card>
        )
    }
}