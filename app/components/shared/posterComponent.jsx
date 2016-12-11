import React from 'react';
import {GridTile} from 'material-ui/GridList';

export default class PosterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            poster: {
                width: '100%',
                height: '100%'
            },
            tile: {
                width: 154,
                height: 236,
                margin: 4
            }
        };
    }
    render() {
        const {poster, title, subtitle} = this.props;
        return (
            <GridTile style={this.styles.tile} title={title} subtitle={subtitle}>
                    <img style={this.styles.poster} src={poster}/>
            </GridTile>
        )
    }
}