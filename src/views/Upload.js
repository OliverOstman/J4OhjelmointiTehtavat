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
            filename: "",
            filedata: null,
        },
    };

    handleFileSubmit = (evt) => {
        console.log(evt);
    };

    handleFileChange = (evt) => {
        console.log(evt);
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
                                       validators={["required", "isFile", "maxFileSize:" + 10 * 1024 * 1024, "allowedExtensions:image/*,video/*,audio/*"]}
                                       errorMessages={['this field is required', "File is not valid", "Size must not exceed 10MB", "Only media files"]}/>
                        <Button type="submit" variant="contained" color="primary">Upload</Button>
                    </ValidatorForm>
                </div>
            </React.Fragment>
        );
    }
}

Upload.propTypes = {
    match: PropTypes.object,
};

export default Upload;