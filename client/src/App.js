import React from "react";
import { Route, Switch } from "react-router-dom";
import TopBar from "./components/section/TopBar";
//import Auth from "./modules/hoc/auth";

// pages
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import UploadPage from "./pages/Upload/UploadPage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import SamplePage from "./pages/SamplePage";

const App = () => {
  return (
    <div>
      {/* <TopBar /> */}
      <div>
        <Switch>
          <Route exact path="/register" component={RegisterPage} />

          {/* <Route exact path="/" component={Auth(LandingPage, null)} />
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
          <Route exact path="/user/cart" component={Auth(CartPage, true)} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default App;
