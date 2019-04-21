import React, {Component} from 'react';
import PropTypes from "prop-types";
import {getUserMedia, deleteMedia} from "../utils/MediaAPI";
import ImageGrid from "../components/ImageGrid";

class MyFiles extends Component {
    state = {
        picArray: [],
    };

    deleteFile = (id) => {
        const deleteOK = window.confirm('Confirm Delete');
        if (!deleteOK) {
            return;
        }
        deleteMedia(id, localStorage.getItem('token')).then(response => {
            this.updateImages();
        }).catch(err => {
            console.log(err);
        });
    };

    updateImages = () => {
        getUserMedia(localStorage.getItem('token')).then((pics) => {
            this.setState({picArray: pics});
        })
};

    componentDidMount() {
        this.updateImages();
    }

    render() {
        return (
            <React.Fragment>
                <ImageGrid picArray={this.state.picArray} edit={true} deleteFile={this.deleteFile}/>
            </React.Fragment>
        )
    }
}

MyFiles.propTypes = {
    picArray: PropTypes.array,
};

export default MyFiles;