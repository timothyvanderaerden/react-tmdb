import React from 'react';
import CircularProgress from  'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row style={{margin: 8}} middle="xs">
                <Col xs={12}>
                    <Row center="xs">
                        <CircularProgress size={80} thickness={5}/>
                    </Row>
                </Col>
            </Row>
        );
    }
}
