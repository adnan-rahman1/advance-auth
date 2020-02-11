import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar";
import Routes from "./components/routes";
import { Layout, Row } from 'antd';

const { Header, Footer, Content } = Layout;


function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Header style={{ padding: 0, height: "auto", textAlign: "center" }}>
          <Navbar />
        </Header> 
        <Content style={{ padding: "10px 50px" }}>
          <Row type="flex" justify="center">
            <Routes />
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </BrowserRouter>
    </Layout>
  )
}

export default App;
