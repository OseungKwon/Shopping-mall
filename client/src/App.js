import React from "react";
import { Route, Switch } from "react-router-dom";
import TopBar from "./components/TopBar";
import Auth from "./components/hoc/auth";

// pages
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SamplePage from "./pages/SamplePage";

const App = () => {
  return (
    <div>
      <TopBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/sample" component={SamplePage} />

          <Route
            exact
            path="/product/upload"
            component={Auth(UploadPage, true)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(ProductPage, null)}
          />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
