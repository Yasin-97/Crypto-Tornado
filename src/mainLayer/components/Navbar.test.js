import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store/store";
import Navbar from "./Navbar";

const setTheme = (theme) => theme;

test("test navbar", () => {
  render(
    <Router>
      <Provider store={store}>
        <Navbar setTheme={() => setTheme()} />
      </Provider>
    </Router>
  );




});
