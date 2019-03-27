import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from "../utils/MediaAPI";

class Single extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

    state = {
        file: {
            filename: '',
            title: '',
        },
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(item => {
            this.setState({file: item})
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.state.file.title}</h1>
                <img src={this.mediaUrl + this.state.file.filename}
                     alt={this.state.file.title}/>
            </React.Fragment>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;