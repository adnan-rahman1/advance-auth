import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

class Navbar extends React.Component {

  render() {
    const { isAuth } = this.props;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.props.history.location.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="logo" style={{ borderBottom: 0 }}>
          <Title level={4} code strong>
            [ADNAN]
          </Title>
        </Menu.Item>

        <Menu.Item key="/home">
          <NavLink to="/home">
            <Icon type="home" />
            Home
          </NavLink>
        </Menu.Item>
        {isAuth || (
          <Menu.Item key="/signin">
            <NavLink to="/signin">Sign in</NavLink>
          </Menu.Item>
        )}
        {isAuth || (
          <Menu.Item key="/signup">
            <NavLink to="/signup">Sign up</NavLink>
          </Menu.Item>
        )}

        {isAuth && (
          <Menu.Item key="signout">
            <NavLink to="/signout">Sign out</NavLink>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default withRouter(Navbar);
