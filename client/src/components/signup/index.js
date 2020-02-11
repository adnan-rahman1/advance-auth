import React from "react";
import axios from "axios";
import { Col, Form, Input, Tooltip, Icon, Button, message } from "antd";

message.config({
  top: 50,
  duration: 2,
  maxCount: 3
});

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      const key = "updatable";
      try {
        const { name, email, password } = values;
        message.loading({
          content: "Action in progress..",
          key
        });
        const res = await axios({
          method: "POST",
          url: "http://localhost:5000/api/signup",
          data: { name, email, password }
        });
        console.log(res);
        message.success({
          content: res.data.message,
          key
        });
        this.props.form.resetFields();
      } catch (err) {
        message.error({
          content: err.response.data.message,
          key
        });
      }
    });
  };


  // Confirm password
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    this.setState({ confirmDirty: value && value === form.getFieldValue('password') });
    
    if (value && value !== form.getFieldValue('password')) {
      callback("Password doesn't matched");
    } else {
      callback();
    }
  };

  // Call from password
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    this.setState({ confirmDirty : value && value === form.getFieldValue("confirm") });

    if (this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    } else {
      form.validateFields(["confirm"], { force: false });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          offset: 0
        },
        sm: {
          offset: 8
        }
      }
    };

    return (
      <Col>
        <Form
          layout="vertical"
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ paddingTop: "50px" }}
        >
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="E-mail">
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
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input.Password 
                autoComplete="password"
              />
            )}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback style={{ marginBottom: '6px'}}>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                autoComplete="Confirm Password"
              />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!this.state.confirmDirty}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    );
  }
}

const SignUp = Form.create({ name: "register" })(RegistrationForm);

export default SignUp;
