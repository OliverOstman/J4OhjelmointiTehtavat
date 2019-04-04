import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";

const imageStyle = {
    width: '20%',
};

const Profile = (props) => {
    const {username, email, full_name, profile_pic} = props.user;
    // button component={Link} to='/logout'
    return (
        <React.Fragment>
            <h1>Profile</h1>
            <img src={profile_pic} alt="Profile pic" style={imageStyle}/>
            <p>Username: {username}</p>
            <p>email: {email}</p>
            <p>Full name: {full_name}</p>
            <ListItem button component={Link} to='/logout' style={imageStyle}>
                <ListItemIcon>
                    <ExitToApp/>
                </ListItemIcon>
                <ListItemText primary='Logout'/>
            </ListItem>
        </React.Fragment>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
};

export default Profile;