import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Home, AccountBox, ExitToApp} from "@material-ui/icons";

const Nav = (props) => {
    return (
        <nav>
            <List>
                <ListItem button component={Link} to='/home'>
                    <ListItemIcon>
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary='Home'/>
                </ListItem>
                {props.checkLogin() &&
                <React.Fragment>
                    <ListItem button component={Link} to='/profile'>
                        <ListItemIcon>
                            <AccountBox/>
                        </ListItemIcon>
                        <ListItemText primary='Profile'/>
                    </ListItem>
                    <ListItem button component={Link} to='/logout'>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary='Logout'/>
                    </ListItem>
                </React.Fragment>
                }
                {!props.checkLogin() &&
                <ListItem button component={Link} to='/'>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary='Login'/>
                </ListItem>
                }
            </List>
        </nav>
    );
};

Nav.propTypes = {
    checkLogin: PropTypes.func,
};

export default Nav;