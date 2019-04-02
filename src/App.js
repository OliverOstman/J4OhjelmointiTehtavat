import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {getAllMedia} from "./utils/MediaAPI";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Single from "./views/Single";
import Login from "./views/Login";
import Logout from "./views/Logout";

class App extends Component {
  state = {
    picArray: [],
    user: null,
  };

  setUser = (user) => {
    this.setState({user});
  };

  checkLogin = () => {
    return this.state.user !== null;
  };

  componentDidMount() {
    getAllMedia().then(items => {
      this.setState({picArray: items});
    })
  };

  // Muista vaihtaa basename!
  render() {
    return (
        <Router basename='/~olivero/login'>
          <div className="container">
            <Nav checkLogin={this.checkLogin}/>

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
          </div>
        </Router>
    );
  }
}

export default App;
