import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <a href="/">Home</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
