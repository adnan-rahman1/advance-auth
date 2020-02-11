import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography

class Navbar extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="logo" style={{ borderBottom: 0 }}>
          <Title level={4} code strong>[ADNAN]</Title>
        </Menu.Item>

        <Menu.Item key="home">
          <NavLink to="/home">
            <Icon type="home" />
            Home
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to="/signin">
            Sign in
          </NavLink>
        </Menu.Item>
        <Menu.Item key="alipay">
          <NavLink to="/signup">
            Sign up
          </NavLink>
        </Menu.Item>
        <Menu.Item key="signout">
          <NavLink to="/signout">
            Sign out
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
