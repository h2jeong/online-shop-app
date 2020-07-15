import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

function LoginPage(props) {
  const dispatch = useDispatch();

  const onFinish = values => {
    // console.log("Success:", values);
    dispatch(loginUser(values)).then(res => {
      if (res.payload.success) {
        message.success("Login Succeed");
        // console.log(res.payload);
        props.history.push("/");
      } else {
        message.error("Login Failed. ");
        console.log(res.payload.err);
      }
    });
  };

  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
