import React, { Component } from 'react';
import './App.css';
import Table from './components/table'
import {getAllMedia} from "./utils/MediaAPI";

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
        <Table picArray={this.state.picArray}/>
      </div>
    );
  }
}

export default App;
