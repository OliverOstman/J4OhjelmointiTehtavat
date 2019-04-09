import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {getAllMedia, getFilesByTag} from "./utils/MediaAPI";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Single from "./views/Single";
import Login from "./views/Login";
import Logout from "./views/Logout";
import {Grid} from "@material-ui/core";
import Upload from "./views/Upload";

class App extends Component {
  state = {
    picArray: [],
    user: null,
  };

  setUser = (user) => {
      getFilesByTag('profile').then((files) => {
          const profilePic = files.filter((file) => {
              let outputFile = null;
              if (file.user_id === this.state.user.user_id) {
                  outputFile = file;
              }
              return outputFile;
          });
          this.setState((prevState) => {
              return {
                  user: {
                      ...prevState.user,
                      profile_pic: profilePic[0],
                  },
              };
          });
      });
      this.setState({user});
  };

  checkLogin = () => {
    return this.state.user !== null;
  };

  componentDidMount() {
    getAllMedia().then(items => {
      this.setState({picArray: items});
    })
  }

  // Muista vaihtaa basename!
  render() {
    return (
        <Router basename='/~olivero/upload/'>
          <Grid container>
            <Grid item md={2} xs={12}>
              <Nav checkLogin={this.checkLogin}/>
            </Grid>

            <Grid item md={10} xs={12}>
            <Route path='/home' render={(props) => (
                <Home {...props} picArray={this.state.picArray}/>
            )}/>

            <Route path='/single/:id' component={Single}/>

            <Route path="/profile" render={(props) => (
                <Profile {...props} user={this.state.user}/>
            )}/>

            <Route exact path="/" render={(props) => (
                <Login {...props} setUser={this.setUser}/>
            )}/>

            <Route path="/logout" render={(props) => (
                <Logout {...props} setUser={this.setUser}/>
            )}/>

            <Route path="/upload" component={Upload}/>

            </Grid>
          </Grid>
        </Router>
    );
  }
}

export default App;
