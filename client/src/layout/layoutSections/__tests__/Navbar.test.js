import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { authActions } from "store/slices/authSlice";
import { createStore,renderWithReduxAndRouter,screen } from "helpers/testUtilities/testUtils";
import {Navbar} from "layout/layoutSections";

describe('Navbar',()=>{
 
  test("should render navbarItems and should not render nav buttons", () => {    
    renderWithReduxAndRouter(
      <Navbar isUserResolved={false}/>
  );

const navbarItems=screen.getAllByTestId('sideNav-item')
expect(navbarItems.length).toBe(5)
expect(screen.queryAllByTestId('sideNav-btn').length).toBe(0)
});

test("No user: should render signup and singin buttons, should NOT render logout button", async()=>{

  renderWithReduxAndRouter(
    <Navbar isUserResolved={true}/>
);

const signup=screen.queryByRole('link', {  name: /sign up/i})
const login=screen.queryByRole('link', {  name: /log in/i})
const logout=screen.queryByRole('link', {  name: /log out/i})

expect(signup).toBeInTheDocument()
expect(login).toBeInTheDocument()
expect(logout).not.toBeInTheDocument()

})


test("user exist: should NOT render signup and singin buttons, should render logout button", async()=>{
  const store=createStore()
  const user={userId: 'vH53kHoyASc1R3Ud2QrzM7VIoBm2', email: 'yasin@gmail.com', displayName: 'YASIN'}
        store.dispatch(authActions.setUser(user))
        renderWithReduxAndRouter(
    <Navbar isUserResolved={true}/>,{store}
);

const signup=screen.queryByRole('link', {  name: /sign up/i})
const login=screen.queryByRole('link', {  name: /log in/i})
const logout=screen.queryByRole('link', {  name: /log out/i})

expect(logout).toBeInTheDocument()
expect(signup).not.toBeInTheDocument()
expect(login).not.toBeInTheDocument()
})
})
