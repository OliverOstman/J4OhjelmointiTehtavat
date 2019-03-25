import React, { Component } from 'react';
import {getAllMedia} from "./utils/MediaAPI";
import Nav from "./components/Nav";
import Home from "./views/Home";

class App extends Component {
  state = {
    picArray: []
  };

  componentDidMount() {
    getAllMedia().then(items => {
      this.setState({picArray: items});
    })
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        <Home picArray={this.state.picArray}/>
      </div>
    );
  }
}

export default App;
