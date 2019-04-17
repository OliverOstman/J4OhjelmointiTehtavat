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
        filters: {
            brightness: 100,
            contrast: 100,
            warmth: 0,
            saturation: 100,
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
            this.setState({file: item, filters: this.getFilters(item.description)})
        })
    }

    getFilters = (text) => {
        const pattern = '\\[f\\](.*?)\\[\\/f\\]';
        const re = new RegExp(pattern);
        try {
            return JSON.parse(re.exec(text)[1]);
        } catch (e) {
            console.log(e);
        }
    };

    getDescription = (text) => {
        const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
        const re = new RegExp(pattern);
        try {
            return re.exec(text)[1];
        } catch (e) {
            return text;
        }
    };

    render() {
        return (
            <div style={this.mainStyle}>
                <h1 style={this.headerStyle}>{this.state.file.title}</h1>
                <img src={this.mediaUrl + this.state.file.filename}
                     alt={this.state.file.title}
                     style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}
                />
                <p>
                    {this.getDescription(this.state.file.description)}
                </p>
            </div>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;