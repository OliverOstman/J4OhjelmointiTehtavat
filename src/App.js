import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {getAllMedia} from "./utils/MediaAPI";
import Nav from "./components/Nav";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Single from "./views/Single";
import Login from "./views/Login";

class App extends Component {
  state = {
    picArray: []
  };

  componentDidMount() {
    getAllMedia().then(items => {
      this.setState({picArray: items});
    })
  }

  // Muista vaihtaa basename!
  render() {
    return (
        <Router basename='/~olivero/login'>
          <div className="container">
            <Nav/>
            <Route path='/' component={Login}/>
            <Route exact path="/" render={(props) => (
                <Home {...props} picArray={this.state.picArray}/>
            )}/>
            <Route path="/profile" component={Profile}/>
            <Route path='/single/:id' exact component={Single} />

          </div>
        </Router>
    );
  }
}

export default App;
