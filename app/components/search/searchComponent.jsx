import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { appBarActions } from '../../actions';
import { Link } from 'react-router-dom';
import { ImageUrl } from '../../api/ApiUrl';
import { Row } from 'react-flexbox-grid/lib/index';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SubHeader from 'material-ui/Subheader';
import PosterComponent from '../shared/posterComponent';
import Divider from 'material-ui/Divider';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      subHeader: {
        fontSize: 24,
      }
    };
  }

  componentWillMount() {
    this.state = {searchResult: null, searchPeople: null};
    this.props.actions.setAppBarSearch(true);
  }

  componentWillUnmount() {
    this.props.actions.setAppBarSearch(false);
  }

  render() {
    const { searchResult, searchPeople } = this.props;

    if (searchResult && searchPeople) {
      const movies = searchResult.results.filter(x => x.media_type === 'movie' && x.poster_path !== null);
      const tvShows = searchResult.results.filter(x => x.media_type === 'tv' && x.poster_path !== null);

      return (
        <List style={{margin: 8}}>
          {movies ?
            <ListItem disabled={true}>
              <SubHeader style={this.styles.subHeader}>Movies</SubHeader>
              <Row center="xs">
                {movies.map(movie => {
                  const image = `${ImageUrl}w154${movie.poster_path}`;

                  return (
                    <Link key={'movie'+movie.id} to={`/movie/${movie.id}/${movie.original_title}`}>
                      <PosterComponent poster={image}/>
                    </Link>
                  );
                })}
              </Row>
            </ListItem> : null
          }
          {tvShows ?
            <ListItem disabled={true}>
              <Divider />
              <SubHeader style={this.styles.subHeader}>TV Shows</SubHeader>
              <Row center="xs">
                {tvShows.map(show => {
                  const image = `${ImageUrl}w154${show.poster_path}`;

                  return (
                    <Link key={'tv'+show.id} to={`/tv/${show.id}/${show.original_name}`}>
                      <PosterComponent poster={image}/>
                    </Link>
                  );
                })}
              </Row>
            </ListItem> : null
          }
          {searchPeople.results ?
            <ListItem disabled={true}>
              <Divider />
              <SubHeader style={this.styles.subHeader}>People</SubHeader>
                <List>
                  {searchPeople.results.map(person => {
                    const image = person.profile_path ?
                      `${ImageUrl}w45${person.profile_path}` :
                      '/app/resources/images/profile_avatar_placeholder.png';

                    return (
                      <ListItem
                        key={'person'+person.id}
                        primaryText={person.name}
                        containerElement={
                          <Link to={`/person/${person.id}/${person.name}`}/>
                        }
                        leftAvatar={<Avatar src={image}/>}
                      />
                    );
                  })}
                </List>
              </ListItem> : null
          }
        </List>
      );
    } else {
      return null;
    }
  }
}

SearchComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  searchResult: PropTypes.object,
  searchPeople: PropTypes.object
};

function mapStateToProps(state) {
  return {
    searchResult: state.search.results,
    searchPeople: state.search.people
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
