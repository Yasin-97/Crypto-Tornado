import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import  {Provider}  from "react-redux";
import store from "store/store";
// import "assets/css/config.min.css";
import "assets/sass/config.scss";

import App from "App";
import "antd/dist/antd.css";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")|| document.createElement('div')
);
