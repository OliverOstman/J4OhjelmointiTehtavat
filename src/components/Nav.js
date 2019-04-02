import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

/*
Account_box, Home ja exit_to_app
 */

const Nav = (props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                {props.checkLogin() &&
                <React.Fragment>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/logout'>Logout</Link>
                    </li>
                </React.Fragment>
                }
                {!props.checkLogin() &&
                <li>
                    <Link to='/'>Login</Link>
                </li>
                }
            </ul>
        </nav>
    );
};

Nav.propTypes = {
    checkLogin: PropTypes.func,
};

export default Nav;