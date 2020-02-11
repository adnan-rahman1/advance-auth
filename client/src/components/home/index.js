import React from 'react';
import Axios from 'axios';
import { message } from "antd";
import Cookies from "js-cookie";

class Home extends React.Component {
  componentDidMount = async () => {
    console.log("Calling from component did mount");
    try {
      console.log(Cookies.get("sid"));
      const res = await Axios({
        method: "GET",
        url: "http://localhost:5000/api/home",
        withCredentials: true
      });
      message.success(res.data.message);
    } catch (err) {
      message.error(err.response.data.message);
    }
    
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