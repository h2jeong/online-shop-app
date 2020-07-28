import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import FooterComponent from "./views/Footer/Footer";
import auth from "../hoc/auth";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/HistoryPage/HistoryPage";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />

        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 70px)" }}>
          <Switch>
            <Route exact path="/" component={auth(LandingPage, null)} />
            <Route path="/login" component={auth(LoginPage, false)} />
            <Route path="/register" component={auth(RegisterPage, false)} />
            <Route
              path="/product/upload"
              component={auth(UploadProductPage, true)}
            />
            <Route
              path="/product/:productId"
              component={auth(DetailProductPage, null)}
            />
            <Route path="/user/cart" component={auth(CartPage, true)} />
            <Route path="/history" component={auth(HistoryPage, true)} />
          </Switch>
        </div>

        <FooterComponent />
      </Suspense>
    </Router>
  );
}

export default App;
