import React from "react";
import { Layout } from "antd";
import { GithubOutlined } from "@ant-design/icons";
const { Footer } = Layout;

function FooterComponent() {
  return (
    <Footer
      style={{ textAlign: "center", background: "#1890ff", color: "white" }}
    >
      ©2020 Created by ZOE. &nbsp;&nbsp;&nbsp;
      <GithubOutlined /> https://github.com/h2jeong/online-shop-app
    </Footer>
  );
}

export default FooterComponent;
