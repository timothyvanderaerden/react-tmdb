import React from 'react';
import Store from '../../store/store';
import {setAppBarSearch} from '../../actions/appBarActions';
import {Link} from 'react-router';
import {ImageUrl} from '../../api/ApiUrl';
import {Row} from 'react-flexbox-grid/lib/index';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SubHeader from 'material-ui/Subheader';
import PosterComponent from '../shared/posterComponent';
import Divider from 'material-ui/Divider';

export default class SearchComponent extends React.Component {
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
        Store.dispatch(setAppBarSearch(true));

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                searchResult: Store.getState().searchResult,
                searchPeople: Store.getState().searchPeople
            });
        });
    }

    componentWillUnmount() {
        Store.dispatch(setAppBarSearch(false));
        this.unsubscribe();
    }

    render() {
        const {searchResult, searchPeople} = this.state;
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
                                    )
                                })}
                            </Row>
                        </ListItem>
                        : null
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
                                    )
                                })}
                            </Row>
                        </ListItem>
                        : null
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
                                        <ListItem key={'person'+person.id}
                                                  primaryText={person.name}
                                                  containerElement={
                                                      <Link to={`/person/${person.id}/${person.name}`}/>
                                                  }
                                                  leftAvatar={<Avatar src={image}/>}/>
                                    )
                                })}
                            </List>
                        </ListItem >
                        :
                        null
                    }
                </List>
            )
        } else {
            return null
        }
    }
}