import React from 'react';
import { Redirect } from "react-router-dom";
import { Statistic, Typography, message } from 'antd';
import Axios from 'axios';

const { Countdown } = Statistic;
const { Title } = Typography;

const deadline = Date.now() + 60 * 24 * 7;

message.config({
  top: 50,
  duration: 2,
  maxCount: 3
});

class ActivateAccount extends React.Component {
  state = {
    msg: "",
    redirect: false,
  }

  componentDidMount = async () => {
    try {
      const { token } = this.props.match.params;
      const res = await Axios({
        method: "POST",
        url: "http://localhost:5000/api/account-activation",
        data: { token }
      });
      this.setState({ msg: res.data.message });
      message.success(res.data.message);
    } catch (err) {
      this.setState({ msg: err.response.data.message });
      message.error(err.response.data.message);
    }
  }
  
  onFinish = () => {
    this.setState({ redirect: true });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div align="center" style={{ paddingTop: '50px'}}>
        <Title level={2}>{ this.state.msg }</Title>
        <Countdown title="Redirecting..." value={deadline} onFinish={this.onFinish} format="s" />
      </div>
    );
  }
}

export default ActivateAccount;