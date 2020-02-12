import React from 'react';
import Axios from 'axios';
import { message } from "antd";
import { Redirect } from "react-router-dom";

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
    this.props.isAuthenticated();
    
  }
  render() {
    return (
      <Redirect to="/signin" />
    )
  }
}

export default SignOut;