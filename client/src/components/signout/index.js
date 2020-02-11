import React from 'react';
import Axios from 'axios';
import { message } from "antd";
import { Cookies } from "js-cookie";

class SignOut extends React.Component {
  componentDidMount = async () => {
    try {
      const res = await Axios({
        method: "POST",
        url: "http://localhost:5000/api/signout",
        withCredentials: true,
      });
      message.success(res.data.message);
    } catch (err) {
      message.error(err.response.data.message);
    }
    
  }
  render() {
    return (
      <div>User signout</div>
    )
  }
}

export default SignOut;