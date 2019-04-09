import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from "@material-ui/core";

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
                this.props.history.push('/home');
                this.props.getMedia();
                this.setState({loading: false});
            }, 2000);

        })
    };

    handleFileChange = (evt) => {
        evt.persist();
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

    /*
    validators={["isFile", "maxFileSize:" + 10 * 1024 * 1024, "allowedExtensions:image/jpg, image/png, image/gif, video/mp4, video/mov, audio/mp3, audio/aac"]}
    errorMessages={["File is not valid", "Size must not exceed 10MB", "Only media files"]}
     */
    render() {
        return (
            <React.Fragment>
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
                                       onChange={this.handleFileChange}
                                       />
                        <br/>
                        <br/>
                        <Button type="submit" variant="contained" color="primary">Upload&nbsp;{this.state.loading && "Loading..."}</Button>
                    </ValidatorForm>
                </div>
            </React.Fragment>
        );
    }
}

Upload.propTypes = {
    history: PropTypes.object,
    getMedia: PropTypes.func,
};

export default Upload;