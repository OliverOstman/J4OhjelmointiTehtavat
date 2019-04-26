import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {Slider} from '@material-ui/lab';
import PropTypes from 'prop-types';
import '../views/css/upload.css';

class ImageEditor extends Component {

    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

    state = this.props.state;

    componentDidMount() {
        if (this.state.filters === undefined) {
            this.setState((prevState) => ({
                ...prevState,
                filters: {
                    brightness: 100,
                    contrast: 100,
                    warmth: 0,
                    saturation: 100,
                },
            }))
        }
    }

    rangeReducer = (rawValue, props) => {
        const {name} = props;
        const value = Math.round(rawValue);
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [name]: value,
            },
        }), () => {
            this.props.updateFilters(this.state.filters);
        });
    };

    render() {
        let imageData = '';
        if (this.state.imageData === undefined || this.state.imageData === null) {
            imageData = this.mediaUrl + this.state.file.filename;
        } else {
            imageData = this.state.imageData;
        }

        return (
            <React.Fragment>
                <div>
                <img src={imageData} alt="preview"
                     className={'preview'}
                     style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}/>
                <div>
                    <Typography
                        id="brightness-label">Brightness: {this.state.filters.brightness}%</Typography>
                    <Slider name="brightness" value={this.state.filters.brightness}
                            valueReducer={this.rangeReducer}
                            className={'slider'}
                            min={0}
                            max={200}
                            step={1}
                            aria-labelledby="brightness-label"/>
                </div>
                <div>
                    <Typography
                        id="contrast-label">Contrast: {this.state.filters.contrast}%</Typography>
                    <Slider name="contrast" value={this.state.filters.contrast}
                            valueReducer={this.rangeReducer}
                            className={'slider'}
                            min={0}
                            max={200}
                            step={1}
                            aria-labelledby="contrast-label"/>
                </div>
                <div>
                    <Typography
                        id="saturation-label">Saturation: {this.state.filters.saturation}%</Typography>
                    <Slider name="saturation" value={this.state.filters.saturation}
                            valueReducer={this.rangeReducer}
                            className={'slider'}
                            min={0}
                            max={200}
                            step={1}
                            aria-labelledby="saturation-label"/>
                </div>
                <div>
                    <Typography
                        id="warmth-label">Warmth: {this.state.filters.warmth}%</Typography>
                    <Slider name="warmth" value={this.state.filters.warmth}
                            valueReducer={this.rangeReducer}
                            className={'slider'}
                            min={0}
                            max={100}
                            step={1}
                            aria-labelledby="warmth-label"/>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

ImageEditor.propTypes = {
    updateFilters: PropTypes.func,
    state: PropTypes.object,
};

export default ImageEditor;