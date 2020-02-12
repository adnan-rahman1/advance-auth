import React from 'react';
import Axios from 'axios';
import { message } from "antd";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount =() => {
    console.log("Calling from component did mount");
    
  }
  render() {
    return (
      <div>Hello From Home Page
        <button onClick={this.handleClick}>Click me to get session</button>
      </div>
    )
  }
}

export default Home;