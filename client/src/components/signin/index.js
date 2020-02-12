import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import { Col, Form, Icon, Input, Button, Checkbox, message } from "antd";

message.config({
  top: 50,
  duration: 2,
  maxCount: 3
});

class SignInForm extends React.Component {

  state = {
    redirect: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const key = "updatable";
      try {
        const { email, password } = values;
        message.loading({
          content: "Action in progress..",
          key
        });
        const res = await axios({
          method: "POST",
          url: "http://localhost:5000/api/signin",
          withCredentials: true,
          data: { email, password }
        });
        this.setState({ redirect: res.data.redirect }); 
        message.success({
          content: res.data.message,
          key
        });
        this.props.isAuthenticated();
        this.props.form.resetFields();
      } catch (err) {
        message.error({
          content: err.response.data.message,
          key
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if(this.state.redirect) {
      return <Redirect to="/home" />
    }

    return (
      <Col>
        <Form
          onSubmit={this.handleSubmit}
          style={{ paddingTop: "50px", maxWidth: "300px" }}
        >
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <NavLink style={{ float: "right" }} to="">
              Forgot password
            </NavLink>
            <br />
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
            Or <NavLink to="/signup">register now</NavLink>
          </Form.Item>
        </Form>
      </Col>
    );
  }
}

const SignIn = Form.create({ name: "normal_login" })(SignInForm);

export default SignIn;
