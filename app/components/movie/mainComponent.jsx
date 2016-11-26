/**
 * Created by timothy on 24/11/16.
 */
import React from 'react';
import Store from '../../store';
import MovieComponent from './movieComponent';
import SidebarComponent from './sidebarComponent';
import ReviewComponent from './reviewComponent';
import {Row, Col} from 'react-flexbox-grid';

export default class MainComponent extends React.Component {
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

    componentWillMount() {
        this.state = {appBarTitle: "Movie"};
        Store.dispatch({type: 'appbar_title', data: this.state.appBarTitle});

        this.unsubscribe = Store.subscribe(() => {
            this.setState({movie: Store.getState().movie});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Row style={{margin: 8}}>
                <Col xs={12} md={8} >
                    <MovieComponent id={this.props.params.movieId} />
                    <ReviewComponent id={this.props.params.movieId} />
                </Col>
                <Col xs={12} md={4} >
                    <SidebarComponent id={this.props.params.movieId} />
                </Col>
            </Row>
        )
    }
}