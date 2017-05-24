import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ImageUrl } from '../../api/ApiUrl';
import { GridList, GridTile } from 'material-ui/GridList';

export default class SimilarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { similar } = this.props;

        return (
            <GridList>
                {similar.results.map(similar => {
                    const image = similar.backdrop_path ?
                        `${ImageUrl}w300${similar.backdrop_path}` :
                        '/app/resources/images/backdrop_placeholder.png';
                    const type = similar.original_title != null ? 'movie' : 'tv';
                    return (
                        <GridTile
                            key={type+similar.id}
                            containerElement={<Link to={`/${type}/${similar.id}/${similar.original_title}`}/>}
                            title={type === 'movie' ? similar.original_title : similar.original_name}
                        >
                            <img src={image}/>
                        </GridTile>
                    );
                })}
            </GridList>
        );
    }
}

SimilarComponent.propTypes = {
  similar: PropTypes.object.isRequired,
};
