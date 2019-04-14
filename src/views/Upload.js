import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    one: {
        display: "none",
    },
    main: {
        display: "flex",
    },
    two: {
        width: "50%"
    }
});

const fr = new FileReader();

class Upload extends Component {
    mediaUrl = "http://media.mw.metropolia.fi/wbma/";
    state = {
        file: {
            title: "",
            description: "",
            filename: undefined,
            filedata: null,
        },
        loading: false,
    };

    filters = {
        brightness: 100,
        contrast: 100,
        warmth: 0,
        saturation: 100,
    };

    p1 = null;
    p2 = null;
    p3 = null;
    p4 = null;
    image = null;

    componentDidMount() {
        this.image = document.querySelector('img');
        const p = document.querySelectorAll('p');
        this.p1 = p[0];
        this.p2 = p[1];
        this.p3 = p[2];
        this.p4 = p[3];
        fr.addEventListener('load', () => {
            this.image.src = fr.result;
        });
    }

    handleFileSubmit = (evt) => {
        this.setState({loading: true});
        const fd = new FormData();
        fd.append("title", this.state.file.title);
        fd.append("description", this.state.file.description);
        fd.append("file", this.state.file.filedata);

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
        const { classes } = this.props;
        classes.one = {display: "flex"};
        fr.readAsDataURL(evt.target.files[0]);
        this.setState((prevState) => ({
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

    handleRangeChange = (element) => {
        this.filters[element.target.id] = element.target.value;
        this.image.style.filter = `brightness(${this.filters.brightness}%) contrast(${this.filters.contrast}%) sepia(${this.filters.warmth}%) saturate(${this.filters.saturation}%)`;
        if (element.target.id === "brightness") {
            this.p1.innerHTML = (element.target.id + ": " + element.target.value + " / " + element.target.max);
        } else if (element.target.id === "contrast") {
            this.p2.innerHTML = (element.target.id + ": " + element.target.value + " / " + element.target.max);
        } else if (element.target.id === "warmth") {
            this.p4.innerHTML = (element.target.id + ": " + element.target.value + " / " + element.target.max);
        } else if (element.target.id === "saturation") {
            this.p3.innerHTML = (element.target.id + ": " + element.target.value + " / " + element.target.max);
        }
    };

    getFilters = (value) => {
        const pattern = '\\[f\\](.*?)\\[\\/f\\]';
        const re = new RegExp(pattern);
        // console.log(re.exec(value));
        try {
            return JSON.parse(re.exec(value)[1]);
        } catch (e) {
            return {
                brightness: 100,
                contrast: 100,
                warmth: 0,
                saturation: 100,
            };
        }
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
                <div className={classes.main}>
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
                    <div className={classes.one}>
                        <h1>Image</h1>
                        <img width="400" alt=""/>
                        <h1>Ei toimi</h1>
                        <div className={classes.main}>
                            <input type="range" min="0" max="200" id="brightness" onChange={this.handleRangeChange} className={classes.two}/>
                            <p>brightness: {this.filters.brightness} / 200</p>
                        </div>
                        <div className={classes.main}>
                            <input type="range" min="0" max="200" id="contrast" onChange={this.handleRangeChange} className={classes.two}/>
                            <p>contrast: {this.filters.contrast} / 200</p>
                        </div>
                        <div className={classes.main}>
                            <input type="range" min="0" max="200" id="saturation" onChange={this.handleRangeChange} className={classes.two}/>
                            <p>saturation: {this.filters.saturation} / 200</p>
                        </div>
                        <div className={classes.main}>
                            <input type="range" min="0" max="100" id="warmth" onChange={this.handleRangeChange} className={classes.two}/>
                            <p>warmth: {this.filters.warmth} / 100</p>
                        </div>
                    </div>
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