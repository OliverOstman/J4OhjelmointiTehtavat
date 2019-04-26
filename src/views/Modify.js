import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button, LinearProgress} from '@material-ui/core';
import ImageEditor from '../components/ImageEditor';
import {
    getSingleMedia,
    modify,
} from '../utils/MediaAPI';
import { withStyles } from '@material-ui/core/styles';
import '../views/css/upload.css';

const styles = () => ({
    root: {
        flexGrow: 1,
    }
});

class Modify extends Component {
    state = {
        file: {
            title: '',
            description: '',
            filedata: null,
            filename: undefined,
            file_id: 0,
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

    componentDidMount() {
        const {id} = this.props.match.params;
        getSingleMedia(id).then(pic => {
            this.setState({
                file: pic,
                filters: this.getFilters(pic.description, this.state.filters),
            });
        });
    }

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

    handleFileSubmit = (evt) => {
        this.setState({loading: true});
        const data = {
            title: this.state.file.title,
            description: `[d]${this.getDescription(
                this.state.file.description)}[/d][f]${JSON.stringify(
                this.state.filters)}[/f]`,
        };

        modify(this.state.file.file_id, data, localStorage.getItem('token'))
            .then(json => {
                setTimeout(() => {
                    this.setState({loading: false});
                    this.props.history.push('/my-files');
                }, 2000);

            })
            .catch(err => {
                console.log('error', err);
            });
    };

    updateFilters = (newFilters) => {
        this.setState((prevState) => ({
            filters: newFilters,
        }));
    };

    getFilters = (text) => {
        const pattern = '\\[f\\](.*?)\\[\\/f\\]';
        const re = new RegExp(pattern);
        if (re.exec(text) !== null) {
            return JSON.parse(re.exec(text)[1]);
        } else {
            return this.state.filters;
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
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={'main'}>
                    <div style={{width: "50%", padding: '1rem'}}>
                        <h1>Modify</h1>
                        <ValidatorForm instantValidate={false}
                                       onSubmit={this.handleFileSubmit}
                                       onError={errors => console.log(errors)}>
                            <TextValidator name="title" label="Title"
                                           value={this.state.file.title}
                                           onChange={this.handleInputChange}
                                           validators={['required', 'minStringLength:3']}
                                           errorMessages={[
                                               'this field is required',
                                               'minimum 3 charaters']}
                                           fullWidth/>
                            <TextValidator name="description" label="Description"
                                           value={this.getDescription(this.state.file.description)}
                                           onChange={this.handleInputChange}
                                           validators={['required', 'minStringLength:3']}
                                           errorMessages={[
                                               'this field is required',
                                               'minimum 3 charaters']}
                                           fullWidth
                                           multiline
                                           rows={3}/>
                            {this.state.loading &&
                            <div className={classes.root}>
                                <br/>
                                <LinearProgress />
                            </div>}
                            <br/>
                            <Button type="submit" variant="contained" color="primary">Save</Button>
                        </ValidatorForm>
                    </div>
                    {this.state.file.filename !== undefined &&
                    <ImageEditor state={this.state} updateFilters={this.updateFilters}/>
                    }
                </div>
            </React.Fragment>
        );
    }
}

Modify.propTypes = {
    history: PropTypes.object,
    updateImages: PropTypes.func,
    match: PropTypes.object,
    classes: PropTypes.object,
};

export default withStyles(styles) (Modify);
