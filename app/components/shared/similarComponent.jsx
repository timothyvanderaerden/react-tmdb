import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { ImageUrl } from '../../api/ApiUrl';
import backdropImage from '../../resources/images/backdrop_placeholder.png';
import { GridList, GridTile } from 'material-ui/GridList';

export default class SimilarComponent extends React.Component {
  render() {
    const { similarList } = this.props;

    return (
      <GridList>
        {similarList.results.map(similar => {
          const image = similar.backdrop_path ?
            `${ImageUrl}w300${similar.backdrop_path}` :
            backdropImage;
          const type = similar.hasOwnProperty('original_title') ? 'movie' : 'tv';
          const title = type === 'movie' ? similar.original_title : similar.original_name;

          return (
            <GridTile
              key={type+similar.id}
              containerElement={<Link to={`/${type}/${similar.id}/${title}`}/>}
              title={title}
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
  similarList: PropTypes.object.isRequired
};
