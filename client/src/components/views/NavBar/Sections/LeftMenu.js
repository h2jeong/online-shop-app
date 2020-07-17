import React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <a href="/">Home</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
