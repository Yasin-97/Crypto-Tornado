import React from "react";
import { render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import store from "store/store";
import { authActions } from "store/slices/authSlice";
import {Navbar} from "mainLayer/index";

describe('Navbar',()=>{
  const setTheme=jest.fn()
 
  test("should render navbarItems and should not render nav buttons", () => {    
    render(
      <Provider store={store}>
        <Router>
      <Navbar setTheme={setTheme} isUserResolved={false}/>
      </Router>
    </Provider>
  );

const navbarItems=screen.getAllByTestId('navbar-item')
expect(navbarItems.length).toBe(5)
expect(screen.queryAllByTestId('nav-btn').length).toBe(0)
});

test("No user: should render signup and singin buttons, should NOT render logout button", async()=>{

  render(
    <Provider store={store}>
      <Router>
    <Navbar setTheme={setTheme} isUserResolved={true}/>
    </Router>
  </Provider>
);

const signup=screen.queryByRole('link', {  name: /sign up/i})
const login=screen.queryByRole('link', {  name: /log in/i})
const logout=screen.queryByRole('link', {  name: /log out/i})

expect(signup).toBeInTheDocument()
expect(login).toBeInTheDocument()
expect(logout).not.toBeInTheDocument()

})


test("No user: should render signup and singin buttons, should NOT render logout button", async()=>{
  const user={email:'yasin@gmail.com', displayName:'yasin'}
        store.dispatch(authActions.setUser(user))
  render(
    <Provider store={store}>
      <Router>
    <Navbar setTheme={setTheme} isUserResolved={true}/>
    </Router>
  </Provider>
);

const signup=screen.queryByRole('link', {  name: /sign up/i})
const login=screen.queryByRole('link', {  name: /log in/i})
const logout=screen.queryByRole('link', {  name: /log out/i})

expect(logout).toBeInTheDocument()
expect(signup).not.toBeInTheDocument()
expect(login).not.toBeInTheDocument()

})

})
