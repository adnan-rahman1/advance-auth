import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar";
import Routes from "./components/routes";
import { Layout, Row } from 'antd';
import Axios from "axios";

const { Header, Footer, Content } = Layout;


class App extends React.Component {

  state = {
    isAuth: false
  }

  isAuthenticated = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: "http://localhost:5000/api/auth",
        withCredentials: true
      });
      this.setState({ isAuth: res.data.isAuth });
    } catch (err) {
      this.setState({ isAuth: err.response.data.isAuth });
    } 
  }

  componentDidMount = async () => {
    await this.isAuthenticated();
  }

  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Header style={{ padding: 0, height: "auto", textAlign: "center" }}>
            <Navbar isAuth={this.state.isAuth}/>
          </Header> 
          <Content style={{ padding: "10px 50px" }}>
            <Row type="flex" justify="center">
              <Routes isAuth={this.state.isAuth} isAuthenticated={this.isAuthenticated} />
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </BrowserRouter>
      </Layout>
    )
  }
}

export default App;
