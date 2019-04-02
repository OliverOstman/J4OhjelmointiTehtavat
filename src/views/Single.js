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

    mainStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    headerStyle = {
      width: '100%',
      textAlign: 'center',
    };

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(item => {
            this.setState({file: item})
        })
    }

    render() {
        return (
            <div style={this.mainStyle}>
                <h1 style={this.headerStyle}>{this.state.file.title}</h1>
                <img src={this.mediaUrl + this.state.file.filename}
                     alt={this.state.file.title}/>
            </div>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;