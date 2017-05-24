import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

export default class KeywordComponent extends React.Component {
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

    render() {
        const { keywords } = this.props;

        return (
            <div style={this.styles.wrapper}>
                {keywords.map(keyword => {
                    return (
                        <Chip key={keyword.id} style={this.styles.chip}>
                            {keyword.name}
                        </Chip>
                    );
                })}
            </div>
        );
    }
}

KeywordComponent.propTypes = {
  keywords: PropTypes.array.isRequired,
};
