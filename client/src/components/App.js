import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import FooterComponent from "./views/Footer/Footer";
import auth from "../hoc/auth";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <NavBar />

        <Content style={{ padding: "30px 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={auth(LandingPage, null)} />
              <Route path="/login" component={auth(LoginPage, false)} />
              <Route path="/register" component={auth(RegisterPage, false)} />
            </Switch>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
