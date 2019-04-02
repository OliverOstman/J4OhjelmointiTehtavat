import React from 'react';
import PropTypes from 'prop-types';

const Profile = (props) => {
    const {username, email, full_name} = props.user;
    return (
        <React.Fragment>
            <h1>Profile</h1>
            <p>Username: {username}</p>
            <p>email: {email}</p>
            <p>Full name: {full_name}</p>
        </React.Fragment>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
};

export default Profile;