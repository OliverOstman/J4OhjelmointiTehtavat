import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button, LinearProgress, Typography} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {Slider} from '@material-ui/lab';
import '../views/css/upload.css';

const styles = () => ({
    root: {
        flexGrow: 1,
    }
});

class Upload extends Component {
    mediaUrl = "http://media.mw.metropolia.fi/wbma/";

    componentDidMount() {
        this.fr.addEventListener('load', () => {
            this.setState((prevState) => ({
                ...prevState,
                imageData: this.fr.result,
            }));
        });
    }

    fr = new FileReader();

    state = {
        file: {
            title: "",
            description: "",
            filename: undefined,
            filedata: null,
        },
        loading: false,
        imageData: null,
        filters: {
            brightness: 100,
            contrast: 100,
            warmth: 0,
            saturation: 100,
        },
        type: '',
    };

    handleFileSubmit = (evt) => {
        this.setState({loading: true});
        const fd = new FormData();
        fd.append('title', this.state.file.title);
        const description  = `[d]${this.state.file.description}[/d][f]${JSON.stringify(this.state.filters)}[/f]`;
        fd.append('description', description);
        fd.append('file', this.state.file.filedata);

        const options = {
            method: "POST",
            body: fd,
            headers: {
                "x-access-token": localStorage.getItem('token'),
            },
        };
        fetch(this.mediaUrl + "media", options).then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            setTimeout(() => {
                this.setState({loading: false});
                this.props.history.push('/home');
                this.props.getMedia();
            }, 2000);

        })
    };

    handleFileChange = (evt) => {
        evt.persist();
        console.log(evt.target.files[0]);
        this.fr.readAsDataURL(evt.target.files[0]);
        this.setState((prevState) => ({
            ...prevState,
            type: evt.target.files[0].type,
            file: {
                ...prevState.file,
                filedata: evt.target.files[0],
            },
        }));
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            file: {
                ...prevState.file,
                [name]: value,
            },
        }));
    };

    handleRangeChange = (rawValue, props) => {
        const {name} = props;
        const value = Math.round(rawValue);
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [name]: value,
            },
        }));
    };

    /*
    validators={["isFile", "maxFileSize:" + 10 * 1024 * 1024, "allowedExtensions:image/jpg, image/png, image/gif, video/mp4, video/mov, audio/mp3, audio/aac"]}
    errorMessages={["File is not valid", "Size must not exceed 10MB", "Only media files"]}
     */
    // Linear Determinate jos jaksat
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={'main'}>
                <div style={{width: "50%", padding: '1rem'}}>
                    <h1>Upload</h1>
                    <ValidatorForm instantValidate={false}
                                   onSubmit={this.handleFileSubmit}
                                   onError={errors => console.log(errors)}>
                        <TextValidator fullWidth name="title" label="Title"
                                       value={this.state.file.title}
                                       onChange={this.handleInputChange}
                                       validators={["required"]}
                                       errorMessages={['this field is required']}/>
                        <TextValidator fullWidth multiline rows={3} name="description" label="Description"
                                       value={this.state.file.description}
                                       onChange={this.handleInputChange}
                                       validators={["required"]}
                                       errorMessages={['this field is required']}/>
                        <TextValidator fullWidth name="filedata" label="File" type="file"
                                       value={this.state.file.filename}
                                       onChange={this.handleFileChange}/>

                        <br/>
                        {this.state.loading && <div className={classes.root}>
                            <br/>
                            <LinearProgress />
                        </div>}
                        <br/>
                        <Button type="submit" variant="contained" color="primary">Upload</Button>
                    </ValidatorForm>
                </div>
                    {this.state.imageData !== null && this.state.type.includes('image') &&
                    <div>
                        <h1>Image</h1>
                        <img src={this.state.imageData} alt="preview"
                             className={'preview'}
                             style={{filter: `brightness(${this.state.filters.brightness}%) contrast(${this.state.filters.contrast}%) sepia(${this.state.filters.warmth}%) saturate(${this.state.filters.saturation}%)`}}/>
                             <br/>
                             <br/>
                        <div>
                            <Typography id="brightness-label">Brightness: {this.state.filters.brightness}%</Typography>
                            <Slider name="brightness" value={this.state.filters.brightness}
                                    className={'slider'}
                                    valueReducer={this.handleRangeChange}
                                    min={0}
                                    max={200}
                                    step={1}
                                    aria-labelledby="brightness-label"/>
                        </div>
                        <div>
                            <Typography id="contrast-label">Contrast: {this.state.filters.contrast}%</Typography>
                            <Slider name="contrast" value={this.state.filters.contrast}
                                    className={'slider'}
                                    valueReducer={this.handleRangeChange}
                                    min={0}
                                    max={200}
                                    step={1}
                                    aria-labelledby="contrast-label"/>
                        </div>
                        <div>
                            <Typography id="saturation-label">Saturation: {this.state.filters.saturation}%</Typography>
                            <Slider name="saturation" value={this.state.filters.saturation}
                                    className={'slider'}
                                    valueReducer={this.handleRangeChange}
                                    min={0}
                                    max={200}
                                    step={1}
                                    aria-labelledby="saturation-label"/>
                        </div>
                        <div>
                            <Typography id="warmth-label">Warmth: {this.state.filters.warmth}%</Typography>
                            <Slider name="warmth" value={this.state.filters.warmth}
                                    className={'slider'}
                                    valueReducer={this.handleRangeChange}
                                    min={0}
                                    max={100}
                                    step={1}
                                    aria-labelledby="warmth-label"/>
                        </div>
                    </div>}
                </div>
            </React.Fragment>
        );
    }
}

Upload.propTypes = {
    history: PropTypes.object,
    getMedia: PropTypes.func,
    classes: PropTypes.object,
};

export default withStyles(styles) (Upload);