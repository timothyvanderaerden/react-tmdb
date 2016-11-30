import React from 'react';
import {ImageUrl} from '../../api/ApiUrl';
import {GridList, GridTile} from 'material-ui/GridList';

export default class SimilarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { similar } = this.props;

        return (
            <GridList>
                {similar.results.map(similar => {
                    const image = `${ImageUrl}w300${similar.backdrop_path}`;
                    return (
                        <GridTile
                            key={similar.id}
                            title={similar.original_title}
                        >
                            {similar.backdrop_path ? <img src={image}/> : null}
                        </GridTile>
                    )
                })}
            </GridList>
        )
    }
}