import React, { memo } from "react";

import { Provider } from "react-redux";
import Store from "../stores/teleSale.store";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Test from "./TeleSale/_testRedux";
import Home from "./TeleSale/_home";
import ErrorPage from "../view/Error";
import ViewTeleSale from "../view/TeleSale";
import ConfigProductField from "../view/ConfigProductField";
import ProductFieldStore from "../stores/productField.store";

const App: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const ProductGroup = params.get('ProductGroup')
  const ProductType = params.get('ProductType')

  localStorage.setItem("token", token ?? "");
  localStorage.setItem("ProductGroup", ProductGroup?.toUpperCase() ?? "");
  localStorage.setItem("ProductType", ProductType?.toUpperCase() ?? "");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/testRedux">
          <Provider store={Store}>
            <Test />
          </Provider>
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="/teleSale">
          <Provider store={Store}>
            <ViewTeleSale />
          </Provider>
        </Route>
        <Route path="/config">
          <Provider store={ProductFieldStore}>
            <ConfigProductField />
          </Provider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default memo(App);
