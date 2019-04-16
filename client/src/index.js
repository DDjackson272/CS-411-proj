import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import "assets/scss/material-kit-react.scss?v=1.4.0";

// pages for this product
import MainPage from "views/MainPage/MainPage.js";
import HotelPage from "views/HotelPage/HotelPage.js";
import {setCurrentUser, setAuthorizationToken} from "./store/actions/auth";
import jwtDecode from "jwt-decode";

var hist = createBrowserHistory();
const store = configureStore();
if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (e) {
        store.dispatch(setCurrentUser({}))
    }
}

ReactDOM.render(
  	<Provider store={store}>
	  <Router history={hist}>
	    <Switch>
	      <Route exact path="/" component={MainPage} />
        <Route exact path="/hotel" component={HotelPage} />
	    </Switch>
	  </Router>
	</Provider>
  	,
  	document.getElementById("root")
);
