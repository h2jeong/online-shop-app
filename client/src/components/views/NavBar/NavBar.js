import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Layout } from "antd";
const { Header } = Layout;

function NavBar() {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 50px",
        background: "white",
        boxShadow: "-5px 5px 5px rgba(0,0,0,0.05)"
      }}
    >
      <LeftMenu style={{ flex: "1 0 0" }} />
      <RightMenu style={{ flex: "1 0 0" }} />
    </Header>
  );
}

export default NavBar;
