import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Button, Drawer } from "antd";
import "./Sections/NavBar.css";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 5, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu />
        </div>
      </div>
      <Button
        className="menu__mobile-button"
        type="primary"
        onClick={showDrawer}
      >
        icon
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        className="menu_drawer"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <LeftMenu />
        <RightMenu />
      </Drawer>
    </nav>
  );
}

export default NavBar;
