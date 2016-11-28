import React from 'react';
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
        const keywords = this.props.keywords;

        return (
            <div style={this.styles.wrapper}>
                {keywords.keywords.map((keyword) => {
                    return (
                        <Chip key={keyword.id} style={this.styles.chip}>
                            {keyword.name}
                        </Chip>
                    )
                })}
            </div>
        )
    }
}